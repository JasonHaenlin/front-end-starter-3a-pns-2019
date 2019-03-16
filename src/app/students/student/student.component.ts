import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Student } from './../../../models/Student';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  @Input() student: Student;

  @Output() studentHasBeenDeleted: EventEmitter<Student> = new EventEmitter<Student>();

  constructor() { }

  ngOnInit() {
  }

  deleteStudent() {
    this.studentHasBeenDeleted.emit(this.student);
  }

}
