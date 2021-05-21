import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { GetAllStudentsQueryGQL, RemoveStudentGQL, UpdateStudentGQL } from './services/studentGraphql.service';
import { Observable } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(
    private readonly updateStudentGQLService: UpdateStudentGQL,
    private apollo: Apollo,
  ) { }

  getAllStudents() {
    return this.apollo.query<any>({
      query: gql`
          query GetAllStudentsQuery {
            findAllStudents {
              id
              name
              email
              dob
            }
          }
        `
    }).toPromise()
    .then(res => this.mapStudent(res.data.findAllStudents));
    //return this.studentGQLService.fetch().pipe(map(res => this.mapStudent(res.data.findAllStudents)));
  }

  deleteStudent(id: number) {
    return this.apollo.query<any>({
      query: gql`
          mutation removeStudent {
            deleteStudent(id: "${id}") {
              id
            }
          }
        `
    }).toPromise();
    //return this.deleteStudentGQLService.mutate({ id: "" + id });
  }

  updateStudent(id: string, name: string, dob: string, email: string) {
    return this.apollo.query<any>({
      query: gql`
          mutation updateStudent {
            updateStudent(input: {email: "${email}", dob: "${dob}", name:"${name}"}, id: "${id}") {
              id
            }
          }
        `
    }).toPromise();
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
