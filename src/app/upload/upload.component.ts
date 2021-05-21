import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UploadEvent } from '@progress/kendo-angular-upload';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';
import { Stream } from 'stream';
import { UploadExcelFileGQL } from '../services/studentGraphql.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  constructor(
    private readonly http: HttpClient
    ) { }

  gqlUrl: string = `${environment.graphqlHost}/graphql`;

  ngOnInit(): void {
  } 

  uploadEventHandler(e: UploadEvent) {
    e.preventDefault();

    if(!confirm("Are you sure you want to upload this file?")) {
      return;
    }
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

    var fd = new FormData()
    fd.append('operations', JSON.stringify(operations))
    fd.append('map', JSON.stringify(_map))
    fd.append('file', file.rawFile, file.name)

    this.http.post(this.gqlUrl, fd).subscribe();
    // this.fileUploadService.mutate({file:exFile}).subscribe(data=> console.log(data));
  }
}
