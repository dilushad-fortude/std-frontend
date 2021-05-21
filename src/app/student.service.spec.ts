import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { GetAllStudentsQueryGQL, RemoveStudentGQL, UpdateStudentGQL } from './services/studentGraphql.service';

import { StudentService } from './student.service';

var stdArr = {
    "data": {
        "findAllStudents": [{
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
        }]
    }
};

describe('StudentService', () => {
    let service: StudentService;
    let getAllService: GetAllStudentsQueryGQL;
    let updateService: UpdateStudentGQL;
    let removeService: RemoveStudentGQL;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: GetAllStudentsQueryGQL,
                    useClass: class {
                        fetch = jasmine.createSpy("mockedGetStdFetch").and.returnValue(of(stdArr));
                    }
                },
                {
                    provide: UpdateStudentGQL,
                    useClass: class {
                        mutate = jasmine.createSpy("mockedUpateStdMutate").and.returnValue(of([]));
                    }
                },
                {
                    provide: RemoveStudentGQL,
                    useClass: class {
                        mutate = jasmine.createSpy("mockedRemoveStdMutate").and.returnValue(of([]));
                    }
                },
            ]
        });
        service = TestBed.inject(StudentService);
        getAllService = TestBed.inject(GetAllStudentsQueryGQL);
        updateService = TestBed.inject(UpdateStudentGQL);
        removeService = TestBed.inject(RemoveStudentGQL);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should load all students', () => {
        service.getAllStudents().subscribe(data => {
            // assert the age calculation
            expect(data[0]['age']).toEqual(25);
        });
        expect(getAllService.fetch).toHaveBeenCalled();
    });

    it('should delete given student', () => {
        service.deleteStudent(1);
        expect(removeService.mutate).toHaveBeenCalled();
    });

    it('should update given student', () => {
        service.updateStudent("2", "Dilusha", "1995/08/25", "di@gmail.com");
        expect(updateService.mutate).toHaveBeenCalled();
    })
});
