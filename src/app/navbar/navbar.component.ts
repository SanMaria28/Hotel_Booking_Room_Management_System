import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ThemeService } from '../services/theme.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(
    public readonly userService: UserService,
    public readonly themeService: ThemeService,
    private readonly router: Router
  ) {}

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/guest-login']);
  }
}
