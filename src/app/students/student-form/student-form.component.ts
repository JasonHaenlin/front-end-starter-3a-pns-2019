import { Student } from 'src/models/Student';
import { StudentService } from './../../../services/student/student.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {

  public studentForm: FormGroup;

  public minLen: number;

  constructor(
    public formBuilder: FormBuilder,
    public studentService: StudentService) {
    this.minLen = 3;
    this.studentForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(this.minLen)]],
      lastName: ['', [Validators.required, Validators.minLength(this.minLen)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
  }

  get firstName() { return this.studentForm.get('firstName'); }
  get lastName() { return this.studentForm.get('lastName'); }
  get email() { return this.studentForm.get('email'); }

  addStudent() {
    const studentToCreate: Student = this.studentForm.getRawValue() as Student;
    studentToCreate.profilePicture = 'https://api.adorable.io/avatars/285/' + Date.now();
    this.studentService.addStudent(studentToCreate);
    this.studentForm.reset();
  }

}
