import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.userService.isAdmin()) {
      return true;
    }
    return this.userService.isLoggedIn()
      ? this.router.createUrlTree(['/dashboard'])
      : this.router.createUrlTree(['/admin-login']);
  }
}
