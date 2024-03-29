import { animate, style, transition, trigger } from '@angular/animations';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Student } from './../../../models/Student';
import { Ticket } from './../../../models/Ticket';
import { StudentService } from './../../../services/student/student.service';
import { LoaderService } from './../../loader/loader.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss'],
  animations: [
    trigger('openClose', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.4s', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('0.2s', style({ opacity: 0 }))
      ])
    ]),
  ],
})
export class StudentDetailComponent implements OnInit {

  public student: Student;
  public ticketList: Ticket[] = [];
  public note = new FormControl('');
  public active = false;

  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private studentService: StudentService,
    private loader: LoaderService
  ) {
    console.log('student-detail-co');
  }

  ngOnInit() {
    console.log('student-detail-co init');
    this.loader.show();
    this.route.data
      .subscribe((data: { student: Student }) => {
        this.student = data.student;
        if (this.student.note) {
          this.note.setValue(this.student.note);
          this.loader.hide();
        }
      });
    this.studentService.getTicketsOfStudentId(+this.route.snapshot.paramMap.get('id'))
      .subscribe(t => {
        this.ticketList = t;
        this.loader.hide();
      });
  }

  goBack() {
    this.location.back();
  }

  addNote() {
    this.student.note = this.note.value;
    this.studentService.addNote(this.student);
    this.active = true;
    setTimeout(() => {
      this.active = false;
    }, 600);
  }

}
