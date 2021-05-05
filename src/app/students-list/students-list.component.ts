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
    id: new FormControl(dataItem.id)
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

  public view: GridDataResult;

  public formGroup: FormGroup;

  private editedRowIndex: number;
  private docClickSubscription: any;
  private isNew: boolean;
  public pageSize = 10;
  public skip = 0;

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

  public loadStudentList() {
    this.studentGQLService.fetch().pipe(map(res => this.mapStudent(res.data.findAllStudents))).subscribe(students => {
      // this.view = students;
      console.log("stds", students);
      this.view = {
        data: students.slice(this.skip, this.skip + this.pageSize),
        total: students.length
      }
    });
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadStudentList();
  }

  private mapStudent(students) {
    let stdList = [];
    for (let x = 0; x < students.length; x++) {
      var ageDifMs = Date.now() - new Date(students[x]['dob']).getTime();
      var ageDate = new Date(ageDifMs);
      var age = Math.abs(ageDate.getUTCFullYear() - 1970);
      students[x]['age'] = age;
      stdList.push(students[x]);
    }
    return stdList;
  }

  public ngOnDestroy(): void {
    this.docClickSubscription();
  }

  public deleteStudent(id) {
    this.deleteStudentGQLService.mutate({ id: "" + id }).subscribe(data => {
      this.loadStudentList();
    })
  }

  public addHandler(event): void {
    this.closeEditor();

    this.formGroup = createFormGroup({
      name: "",
      dob: "",
      email: "",
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
