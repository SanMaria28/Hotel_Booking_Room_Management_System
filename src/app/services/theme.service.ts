import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly storageKey = 'app-theme';
  private readonly darkModeSubject = new BehaviorSubject(this.readTheme());

  readonly darkMode$ = this.darkModeSubject.asObservable();

  constructor() {
    this.applyTheme(this.darkModeSubject.value);
  }

  get isDarkMode(): boolean {
    return this.darkModeSubject.value;
  }

  toggleTheme(): void {
    this.setTheme(!this.darkModeSubject.value);
  }

  setTheme(isDarkMode: boolean): void {
    localStorage.setItem(this.storageKey, isDarkMode ? 'dark' : 'light');
    this.darkModeSubject.next(isDarkMode);
    this.applyTheme(isDarkMode);
  }

  private applyTheme(isDarkMode: boolean): void {
    document.body.classList.toggle('dark-mode', isDarkMode);
    document.documentElement.style.colorScheme = isDarkMode ? 'dark' : 'light';
  }

  private readTheme(): boolean {
    return localStorage.getItem(this.storageKey) === 'dark';
  }
}
