import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { GetAllStudentsQueryGQL, RemoveStudentGQL, UpdateStudentGQL } from '../services/studentGraphql.service';
import { map } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StudentService } from '../student.service';
import { GridComponent, GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';

const createFormGroup = dataItem =>
  new FormGroup({
    name: new FormControl(dataItem.name),
    dob: new FormControl(dataItem.dob),
    email: new FormControl(dataItem.email),
    id: new FormControl(dataItem.id),
  });

const matches = (el, selector) =>
  (el.matches || el.msMatchesSelector).call(el, selector);


@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {

  @ViewChild(GridComponent)
  private grid: GridComponent;

  public view: any[];

  public formGroup: FormGroup;

  private editedRowIndex: number;
  private docClickSubscription: any;
  private isNew: boolean;

  constructor(
    private renderer: Renderer2,
    private readonly studentGQLService: GetAllStudentsQueryGQL,
    private readonly updateStudentGQLService: UpdateStudentGQL,
    private readonly deleteStudentGQLService: RemoveStudentGQL,
  ) { }

  public ngOnInit(): void {
    this.loadStudentList();

    this.docClickSubscription = this.renderer.listen(
      "document",
      "click",
      this.onDocumentClick.bind(this)
    );
  }

  private loadStudentList() {
    this.studentGQLService.fetch().pipe(map(res => res.data.findAllStudents)).subscribe(students => {
      this.view = students;
    });
  }

  public ngOnDestroy(): void {
    this.docClickSubscription();
  }

  public deleteStudent(id) {
    this.deleteStudentGQLService.mutate({id: ""+id}).subscribe(data => {
      this.loadStudentList();
    })
  }

  public addHandler(event): void {
    this.closeEditor();

    this.formGroup = createFormGroup({
      name: "",
      dob: "",
      email: "",
      id: ""
    });
    this.isNew = true;

    this.grid.addRow(this.formGroup);
  }

  public saveRow() {
    if (this.formGroup && this.formGroup.valid) {
      this.saveCurrent();
    }
  }

  private saveCurrent(): void {
    if (this.formGroup) {
      if (!this.isNew) {
        console.log(this.formGroup.value);
        this.updateStudentGQLService.mutate({
          name: this.formGroup.value['name'],
          dob: this.formGroup.value['dob'],
          email: this.formGroup.value['email'],
          id: "" + this.formGroup.value['id']
        }).subscribe(data => {
          this.loadStudentList();
        });
      }
      this.closeEditor();
    }
  }

  public cellClickHandler({ isEdited, dataItem, rowIndex }): void {
    if (isEdited || (this.formGroup && !this.formGroup.valid)) {
      return;
    }

    if (this.isNew) {
      rowIndex += 1;
    }

    this.saveCurrent();

    this.formGroup = createFormGroup(dataItem);
    this.editedRowIndex = rowIndex;

    this.grid.editRow(rowIndex, this.formGroup);
  }

  public cancelHandler(): void {
    this.closeEditor();
  }

  private closeEditor(): void {
    this.grid.closeRow(this.editedRowIndex);

    this.isNew = false;
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }

  private onDocumentClick(e: any): void {
    if (
      this.formGroup &&
      this.formGroup.valid &&
      !matches(
        e.target,
        "#productsGrid tbody *, #productsGrid .k-grid-toolbar .k-button"
      )
    ) {
      this.saveCurrent();
    }
  }
}
