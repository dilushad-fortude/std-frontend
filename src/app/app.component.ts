import { Component, ViewChild } from '@angular/core';
import { StudentsListComponent } from './students-list/students-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(StudentsListComponent) stdListComponent: StudentsListComponent;

  title = 'std-frntend';

  refreshStudentList(e){
    console.log('toggle');
    this.stdListComponent.loadStudentList();
  }
}
