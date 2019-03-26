import { LoaderService } from './../../loader/loader.service';
import { StudentService } from './../../../services/student/student.service';

import { Student } from 'src/models/Student';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, timeout, timeInterval, debounce } from 'rxjs/operators';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
  animations: [
    trigger('shrinkOut', [
      state('in', style({ height: '*' })),
      transition(':leave', [
        style({ height: '*' }),
        animate(250, style({ height: 0 }))
      ])
    ]),
    trigger('comeIn', [
      state('out', style({ height: 0 })),
      transition(':enter', [
        style({ height: 0 }),
        animate(250, style({ height: '*' }))
      ])
    ])
  ]
})
export class StudentListComponent implements OnInit {
  private searchTerms$ = new Subject<string>();
  public studentList: Student[] = [];
  private debounce = true;

  constructor(public studentService: StudentService,
    private loader: LoaderService) { }

  ngOnInit() {
    this.searchTerms$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => {
        this.loader.show();
        return this.studentService.searchStudent(term);
      }),
    ).subscribe(s => {
      this.studentList = s;
      this.loader.hide();
    });
    this.search('');

    this.studentService.student$.subscribe(s => this.studentList = s);
  }

  studentHasBeenDeleted(student: Student) {
    if (debounce) {
      this.studentService.deleteStudent(student);
      this.debounce = false;
    }
    setTimeout(() => {
      this.debounce = true;
    }, 300);
  }

  search(term: string): void {
    this.searchTerms$.next(term);
  }

}
