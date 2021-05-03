import { Component, OnInit } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  constructor() { }

  uploadSaveUrl = 'http://localhost:3000/student/upload'; // should represent an actual API endpoint
  uploadRemoveUrl = 'http://localhost:3000/student/upload'; // should represent an actual API endpoint

  ngOnInit(): void {
  }

  

}
