import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { GetOneStudentGQL, RemoveStudentGQL } from '../services/studentGraphql.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor(
    private readonly getOneStudent: GetOneStudentGQL,
    private readonly removeStudentService: RemoveStudentGQL
    ) { }

  ngOnInit(): void {
  }

  student$ = this.getOneStudent.fetch({id:8}).pipe(map((res) => res.data.studentById));

}
