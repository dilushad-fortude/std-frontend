import { Component, OnInit } from '@angular/core';
import { GetAllStudentsQueryGQL, RemoveStudentGQL } from '../services/studentGraphql.service';
import { map } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {
  public formGroup: FormGroup;
  private editedRowIndex: number;

  constructor(
    private readonly studentService: StudentService,
    private readonly studentGQLService: GetAllStudentsQueryGQL
  ) { }

  ngOnInit(): void {
  }

  studentsList$ = this.studentService.getAllStudents();

  public editHandler({ sender, rowIndex, dataItem }) {
    this.closeEditor(sender);

    this.formGroup = new FormGroup({
      'ProductID': new FormControl(dataItem.ProductID),
      'ProductName': new FormControl(dataItem.ProductName, Validators.required),
      'UnitPrice': new FormControl(dataItem.UnitPrice),
      'UnitsInStock': new FormControl(
        dataItem.UnitsInStock,
        Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,3}')])),
      'Discontinued': new FormControl(dataItem.Discontinued)
    });

    this.editedRowIndex = rowIndex;

    sender.editRow(rowIndex, this.formGroup);
  }

  public cancelHandler({ sender, rowIndex }) {
    // this.removeStudentService.mutate({ id: 8 });
    this.closeEditor(sender, rowIndex);
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }) {

    // this.editService.save(product, isNew);

    sender.closeRow(rowIndex);
  }

  public removeHandler({ dataItem }) {
    // this.removeStudentService.mutate({ id: dataItem.id })
    //   .subscribe(res => {
    //     console.log(res);
    //     // this.studentsList$ = this.studentListService.fetch().pipe(map(res => res.data.allStudents.nodes));
    //   });
  }

  private closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }

}
