import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, Form, FormControl, AbstractControl } from '@angular/forms';
import { Ticket } from '../../../models/Ticket';
import { TicketService } from '../../../services/ticket/ticket.service';
import { Student } from './../../../models/Student';
import { Major } from './../../../models/Ticket';
import { StudentService } from './../../../services/student/student.service';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.scss']
})
export class TicketFormComponent implements OnInit {

  public studentList: Student[] = [];

  public keys = Object.keys;
  public Major = Major;
  public studentError = true;
  public minLen: number;
  public ticketForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public ticketService: TicketService,
    public studentService: StudentService) {
    this.minLen = 3;
    // Form creation
    this.ticketForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(this.minLen)]],
      description: ['', [Validators.required, Validators.minLength(this.minLen)]],
      major: ['', Validators.required],
      students: this.formBuilder.array([]),
    });
  }

  ngOnInit() {
    this.studentService.student$.subscribe(s => {
      this.studentList = s;
      this.addStudentToForm();
    });
  }

  get title() { return this.ticketForm.get('title'); }
  get description() { return this.ticketForm.get('description'); }
  get major() { return this.ticketForm.get('major'); }
  get students() { return this.ticketForm.get('students') as FormArray; }


  getStudentObject(i: number) { return this.students.at(i).value.student; }

  addStudentToForm() {
    const len = this.students.length;
    if (len > 0) {
      const curStudent = this.getStudentObject(len - 1);
      if (this.checkStudentValidity(curStudent) === undefined) { return; }
    }
    this.students.push(this.formBuilder.group({
      student: ['', [Validators.required, this.validateStudent.bind(this)]],
    }));
  }

  removeAt(index: number) {
    if (this.students.length < 2) { return; }
    this.students.removeAt(index);
  }

  addTicket() {
    const rawTicket = this.ticketForm.getRawValue();

    const studentsFormArray = [];
    this.students.getRawValue().forEach(rawStudent => {
      const student: Student = this.checkStudentValidity(rawStudent.student);
      if (student === undefined) { return; }
      studentsFormArray.push(student.id);
    });
    delete rawTicket.students;

    const newTicket: Ticket = rawTicket as Ticket;
    newTicket.date = new Date();

    newTicket['studentId'] = studentsFormArray;
    newTicket.archived = false;
    this.ticketService.addTicket(newTicket);
    this.ticketForm.reset();
  }

  checkStudentValidity(studentValue: string) {
    const studentArray: string[] = studentValue.split(' ');
    return this.studentList.find(s => studentArray[0] === s.lastName && studentArray[1] === s.firstName);
  }

  validateStudent(control: AbstractControl) {
    if (control.value.length === 0) { return null; }
    const student = this.checkStudentValidity(control.value);
    return student === undefined ? { 'validStudent': true } : null;
  }
}
