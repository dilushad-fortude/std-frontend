import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StudentComponent } from './student/student.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { StudentsListComponent } from './students-list/students-list.component';



@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    StudentsListComponent
  ],
  imports: [
    BrowserModule,
    GridModule,
    BrowserAnimationsModule,
    GraphQLModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
