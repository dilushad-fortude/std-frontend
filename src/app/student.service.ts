import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { GetAllStudentsQueryGQL, RemoveStudentGQL, UpdateStudentGQL } from './services/studentGraphql.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(
    private readonly studentGQLService: GetAllStudentsQueryGQL,
    private readonly updateStudentGQLService: UpdateStudentGQL,
    private readonly deleteStudentGQLService: RemoveStudentGQL,
  ) { }

  getAllStudents(): Observable<any[]> {
    return this.studentGQLService.fetch().pipe(map(res => this.mapStudent(res.data.findAllStudents)));
  }

  deleteStudent(id: number) {
    return this.deleteStudentGQLService.mutate({ id: "" + id });
  }

  updateStudent(id: string, name: string, dob: string, email: string) {
    return this.updateStudentGQLService.mutate({
        id: id, name: name, dob: dob, email: email
      });
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

}
