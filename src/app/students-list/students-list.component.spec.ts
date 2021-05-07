import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { GridModule } from '@progress/kendo-angular-grid';
import { of } from 'rxjs';
import { GraphQLModule } from '../graphql.module';
import { StudentService } from '../student.service';

import { StudentsListComponent } from './students-list.component';

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
    TestBed.configureTestingModule({
      imports: [GraphQLModule, MatCardModule, GridModule],
      declarations: [StudentsListComponent],
      providers: [StudentService, HttpClient, HttpHandler]
    });
    fixture = TestBed.createComponent(StudentsListComponent);
    component = fixture.componentInstance;
    studentService = TestBed.inject(StudentService);
    fixture.detectChanges();

  });

  it('should creatce', () => {
    expect(component).toBeTruthy();
  });

  it('should load all students', () => {
    component.loadStudentList();
    expect(component.view.data.length == 2).toBeTruthy();
  })
});

class MockStudentServie extends StudentService {

  getAllStudents() {
    return of([{
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
    }]);
  }
}