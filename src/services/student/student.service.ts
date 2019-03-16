import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/index';
import { catchError, map, share, shareReplay } from 'rxjs/operators';
import { Student } from 'src/models/Student';
import { API_URL, handleError, HTTP_OPTIONS } from '../httpHelper';
import { Ticket } from './../../models/Ticket';

const url = API_URL + 'students';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private studentList: Student[];

  public student$: BehaviorSubject<Student[]> = new BehaviorSubject([]);

  constructor(private http: HttpClient) {
    this.loadStudents();
    console.log('student service');
  }

  addNote(student: Student): void {
    const studentUrl = `${url}/${student.id}`;
    this.http.put<Student>(studentUrl, student, HTTP_OPTIONS)
      .pipe(catchError(handleError('addNote')))
      .subscribe(s => {
        const newStudent: Student = s;
        this.studentList[this.studentList.indexOf(this.getById(newStudent.id))].note = newStudent.note;
      });
  }

  deleteStudent(student: Student): void {
    const studentUrl = `${url}/${student.id}`;
    this.http.delete<Student>(studentUrl, HTTP_OPTIONS)
      .pipe(catchError(handleError('deleteStudent')))
      .subscribe(s => {
        const deletedStudent: Student = s;
        try {
          this.studentList.splice(this.studentList.indexOf(this.getById(deletedStudent.id)), 1);
          this.student$.next(this.studentList);
        } catch (error) {
          console.error(error);
        }
      });
  }

  addStudent(studentToCreate: Student): void {
    this.http.post<Student>(url, studentToCreate, HTTP_OPTIONS)
      .pipe(catchError(handleError('addStudent')))
      .subscribe(s => {
        if (s !== undefined) {
          this.studentList.push(s);
          this.student$.next(this.studentList);
        }
      });
  }

  getById(id: number): Student {
    return this.studentList.find((student) => student.id === +id);
  }

  getStudent(id: number | string): Observable<Student> {
    if (!this.studentList || !this.studentList.length) {
      const studentUrl = `${url}/${id}`;
      return this.http.get<Student>(studentUrl, HTTP_OPTIONS)
        .pipe(catchError(handleError('getStudent')));
    }
    return this.student$.pipe(map(student => student.find(s => s.id === +id)));
  }

  getTicketsOfStudentId(id: number): Observable<Ticket[]> {
    const studentUrl = `${url}/${id}/tickets`;
    return this.http.get<Ticket[]>(studentUrl, HTTP_OPTIONS)
      .pipe(catchError(handleError('getStudent', [])));
  }

  loadStudents(): void {
    this.http.get<Student[]>(url, HTTP_OPTIONS)
      .pipe(shareReplay(1))
      .subscribe(s => {
        this.studentList = s;
        this.student$.next(this.studentList);
      },
        err => console.log('Error retrieving students list'));
  }

  searchStudent(term: string): Observable<Student[]> {
    let searchUrl = `${url}/?name=${term}`;
    if (!term.trim()) {
      searchUrl = url;
    }
    return this.http.get<Student[]>(searchUrl, HTTP_OPTIONS)
      .pipe(catchError(handleError<Student[]>('searchStudent', [])));
  }
}
