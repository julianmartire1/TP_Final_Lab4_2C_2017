import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class VerificarService implements CanActivate {

  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
    let local = localStorage.getItem("token");

    if (local != null) {
      return true;
    }
    else {
      this.router.navigate(['/Login']);
      return !true;
    }
  }
}
