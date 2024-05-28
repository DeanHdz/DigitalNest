import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; //Implementar Observable para que login y register page pueda subscribirse a los eventos y mostrar en el console.log el response

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth_token'; //Variable para guardar el token en el localStorage

  constructor(private http: HttpClient) {}

  login(emailInput: string, passInput: string): Observable<any> {
    return this.http.post("http://localhost:8080/api/auth/login", {
      "email": emailInput,
      "password": passInput
    });
  }

  register(nameInput: string, emailInput: string, passInput: string): Observable<any> {
    return this.http.post("http://localhost:8080/api/auth/register", {
      "username": nameInput,
      "email": emailInput,
      "password": passInput
    });
  }

  logout(): void {
    this.removeToken();
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
