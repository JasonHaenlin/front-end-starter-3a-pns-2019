import { Injectable } from '@angular/core';
import { ActivatedRoute, Resolve, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { Student } from './../../models/Student';
import { StudentService } from './../../services/student/student.service';
import { take, mergeMap, tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentDetailsResolverService implements Resolve<Student> {
  studentDetail: Student;

  constructor(
    private studentService: StudentService,
    private router: Router
  ) {
    console.log('resolver');
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Student> | Observable<never> {

    return this.studentService.getStudent(route.paramMap.get('id')).pipe(
      take(1),
      switchMap(student => {
        if (student) {
          console.log('resolver OK');

          return of(student);
        } else { // id not found
          this.router.navigate(['/pageNotFound']);
          return EMPTY;
        }
      })
    );
  }

}
