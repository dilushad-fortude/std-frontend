import { HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { UploadEvent, UploadModule } from '@progress/kendo-angular-upload';
import { of } from 'rxjs';

import { UploadComponent } from './upload.component';

describe('UploadComponent', () => {
    let component: UploadComponent;
    let fixture: ComponentFixture<UploadComponent>;
    let httpMock: HttpTestingController;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UploadComponent],
            imports: [
                HttpClientTestingModule,
                UploadModule,
                MatButtonModule
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UploadComponent);
        component = fixture.componentInstance;
        httpMock = TestBed.inject(HttpTestingController);
        fixture.detectChanges();
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it("should upload file", () => {
        let filesArr: File[] = new Array();
        let blob = new Blob([""], { type: 'text/html' });
        blob["lastModifiedDate"] = "";
        blob["name"] = "filename";

        let fakeF = <File>blob;
        fakeF["rawFile"] = blob;
        filesArr.push(fakeF);
        let headers: HttpHeaders = new HttpHeaders();
        let e: UploadEvent = new UploadEvent(filesArr, headers);
        component.uploadEventHandler(e);

        const req = httpMock.expectOne("http://localhost:8879/graphql");
        expect(req.request.method).toBe("POST");
        req.flush(of([]));
    });
});
