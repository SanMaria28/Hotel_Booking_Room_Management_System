import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrls: ['./login.component.css']
})
export class SignupComponent {
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

    this.userService.signup(form.value).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (error: Error) => {
        this.loading = false;
        this.error = error.message;
      }
    });
  }
}
