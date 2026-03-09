import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { UserRole } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  error: string | null = null;
  loginRole: UserRole = 'guest';

  constructor(
    private readonly userService: UserService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.loginRole = (data['role'] as UserRole | undefined) ?? 'guest';
    });
  }

  get isAdminLogin(): boolean {
    return this.loginRole === 'admin';
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    this.loading = true;
    this.error = null;

    const { username, password } = form.value as { username: string; password: string };

    this.userService.login(username, password, this.loginRole).subscribe({
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
