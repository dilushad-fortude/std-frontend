import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UploadEvent } from '@progress/kendo-angular-upload';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Stream } from 'stream';
import { UploadExcelFileGQL } from '../services/studentGraphql.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  constructor(
    private readonly fileUploadService: UploadExcelFileGQL,
    private readonly http: HttpClient
    ) { }

  uploadSaveUrl = 'http://localhost:3000/student/upload'; // should represent an actual API endpoint
  uploadRemoveUrl = 'http://localhost:3000/student/upload'; // should represent an actual API endpoint

  gqlUrl: string = "http://localhost:3000/graphql";

  ngOnInit(): void {
  }

  uploadFile(file) {
    this.fileUploadService.mutate({file: file});
  }  

  uploadEventHandler(e: UploadEvent) {
    e.preventDefault();
    // e.headers = e.headers.append('X-Foo', 'Bar');
    console.log(e.files[0].rawFile);
    let file = e.files[0];

    var operations = {
      query: `
        mutation ($file: Upload!) { uploadFile(file: $file) }
      `,
      variables: {
        file: null
      }
    }

    var _map = { 
      file: ["variables.file"]
    }

    // var file = $event.target.files[0]
    var fd = new FormData()
    fd.append('operations', JSON.stringify(operations))
    fd.append('map', JSON.stringify(_map))
    fd.append('file', file.rawFile, file.name)

    this.http.post(this.gqlUrl, fd).subscribe()
    // this.fileUploadService.mutate({file:exFile}).subscribe(data=> console.log(data));
  }
}

class FileUpload{
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}
