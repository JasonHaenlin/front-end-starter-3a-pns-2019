import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';

const checkNumber = new RegExp('^[0-9]*$');

@Injectable({
  providedIn: 'root'
})
export class StudentsGuard implements CanActivate {

  constructor(private router: Router) {
    console.log('guard');
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const check = checkNumber.test(next.paramMap.get('id'));
    // an id need to be a number > integer
    if (!check) {
      this.router.navigate(['/pageNotFound']);
    }
    console.log('guard OK');

    return check;
  }
}
