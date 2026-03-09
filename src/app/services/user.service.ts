import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly storageKey = 'currentUser';
  private readonly usersUrl = 'http://localhost:3000/users';
  private readonly sessionSubject = new BehaviorSubject<User | null>(this.readStoredUser());

  readonly session$ = this.sessionSubject.asObservable();

  constructor(private http: HttpClient) {}

  get currentUser(): User | null {
    return this.sessionSubject.value;
  }

  login(username: string, password: string): Observable<User> {
    return this.http.get<User[]>(`${this.usersUrl}?username=${username}`).pipe(
      map((users) => {
        const user = users.find((candidate) => candidate.password === password);
        if (!user) {
          throw new Error('Invalid username or password');
        }
        return user;
      }),
      tap((user) => this.setSession(user))
    );
  }

  signup(user: Omit<User, 'id' | 'role'> & Partial<Pick<User, 'role'>>): Observable<User> {
    const payload: Omit<User, 'id'> = {
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role ?? 'guest'
    };

    return this.http.post<User>(this.usersUrl, payload).pipe(
      tap((createdUser) => this.setSession(createdUser))
    );
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
    this.sessionSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  private setSession(user: User): void {
    localStorage.setItem(this.storageKey, JSON.stringify(user));
    this.sessionSubject.next(user);
  }

  private readStoredUser(): User | null {
    const storedUser = localStorage.getItem(this.storageKey);
    return storedUser ? (JSON.parse(storedUser) as User) : null;
  }
}
