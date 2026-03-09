import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loading = false;
  error: string | null = null;

  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    this.loading = true;
    this.error = null;

    const { username, password } = form.value as { username: string; password: string };

    this.userService.login(username, password).subscribe({
      next: (user) => {
        this.loading = false;
        this.router.navigate([user.role === 'admin' ? '/admin' : '/dashboard']);
      },
      error: (error: Error) => {
        this.loading = false;
        this.error = error.message;
      }
    });
  }
}
