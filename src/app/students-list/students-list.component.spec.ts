import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { GridModule, PageChangeEvent } from '@progress/kendo-angular-grid';
import { of } from 'rxjs';
import { GraphQLModule } from '../graphql.module';
import { StudentService } from '../student.service';

import { StudentsListComponent } from './students-list.component';

var stdDataArr: any[] = stdList;

describe('StudentsListComponent', () => {
  let component: StudentsListComponent;
  let fixture: ComponentFixture<StudentsListComponent>;
  let studentService: StudentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {

    stdDataArr = stdList;

    TestBed.configureTestingModule({
      imports: [GraphQLModule, MatCardModule, GridModule, MatButtonModule],
      declarations: [StudentsListComponent],
      providers: [{
        provide: StudentService,
        useClass: class {
          deleteStudent = jasmine.createSpy("mockedDeleteStudent").and.callFake(()=>{
            stdDataArr.pop();
            return of([]);
          });
          getAllStudents = jasmine.createSpy("mockedLoadStudents").and.returnValue(of(stdDataArr));
          updateStudent = jasmine.createSpy("mockedLoadStudents").and.returnValue(of([]));
        }
      }, HttpClient, HttpHandler]
    });
    fixture = TestBed.createComponent(StudentsListComponent);
    component = fixture.componentInstance;
    studentService = TestBed.inject(StudentService);
    fixture.detectChanges();

    component.view = {
      data: stdDataArr,
      total: 10
    }
  });

  it('should creatce', () => {
    expect(component).toBeTruthy();
  });

  it('should load all students', () => {
    let length = stdDataArr.length;
    component.loadStudentList();
    expect(component.view.data.length).toEqual(length);
  });

  it('should delete one student', () => {
    component.deleteStudent(1);
    expect(component.view.data.length == 9).toBeTruthy();
  });

  it('should load student list when their a change in page', ()=> {
    let e: PageChangeEvent = {skip:5, take: 5};
    component.pageChange(e);
    expect(studentService.getAllStudents).toHaveBeenCalled();
  });

  it('should add new line to kendo grid', ()=> {
    let e: PageChangeEvent = {skip:5, take: 5};
    component.addHandler(e);
    expect(component['isNew']).toBeTrue();
  });

  it('should add new student', ()=> {
    let e: PageChangeEvent = {skip:5, take: 5};
    component.addHandler(e);
    component.saveRow();
    expect(studentService.updateStudent).not.toHaveBeenCalled();
    // In the end, the isNew value should reset
    expect(component['isNew']).toBeFalse();
  });
});

var stdList = [{
  "id": 48,
  "name": "chamath",
  "email": "dilusha@gmail.com",
  "dob": "1995-08-25T00:00:00"
},
{
  "id": 49,
  "name": "rahal",
  "email": "renisha@gmail.com",
  "dob": "1996-09-25T00:00:00"
},
{
  "id": 48,
  "name": "chamath",
  "email": "dilusha@gmail.com",
  "dob": "1995-08-25T00:00:00"
},
{
  "id": 49,
  "name": "rahal",
  "email": "renisha@gmail.com",
  "dob": "1996-09-25T00:00:00"
},
{
  "id": 48,
  "name": "chamath",
  "email": "dilusha@gmail.com",
  "dob": "1995-08-25T00:00:00"
},
{
  "id": 49,
  "name": "rahal",
  "email": "renisha@gmail.com",
  "dob": "1996-09-25T00:00:00"
},
{
  "id": 48,
  "name": "chamath",
  "email": "dilusha@gmail.com",
  "dob": "1995-08-25T00:00:00"
},
{
  "id": 49,
  "name": "rahal",
  "email": "renisha@gmail.com",
  "dob": "1996-09-25T00:00:00"
},
{
  "id": 48,
  "name": "chamath",
  "email": "dilusha@gmail.com",
  "dob": "1995-08-25T00:00:00"
},
{
  "id": 49,
  "name": "rahal",
  "email": "renisha@gmail.com",
  "dob": "1996-09-25T00:00:00"
}];