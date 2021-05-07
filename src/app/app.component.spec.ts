import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridModule } from '@progress/kendo-angular-grid';
import { UploadComponent, UploadModule } from '@progress/kendo-angular-upload';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { NotificationComponent } from './notification/notification.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        StudentsListComponent,
        UploadComponent,
        NotificationComponent
      ],
      imports: [
        BrowserModule,
        GridModule,
        BrowserAnimationsModule,
        GraphQLModule,
        HttpClientTestingModule,
        UploadModule,
        MatCardModule,
        MatToolbarModule,
        MatIconModule,
        MatBadgeModule,
        MatMenuModule,
        MatButtonModule
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'std-frntend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('std-frntend');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    // expect(compiled.querySelector('.content span').textContent).toContain('std-frntend app is running!');
  });
});
