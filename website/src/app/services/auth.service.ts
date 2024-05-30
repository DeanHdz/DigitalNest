import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs'; 
//Implementar Observable para que login y register page pueda subscribirse a los eventos y mostrar en el console.log el response
//Implementar BehaviorSubject para que header component pueda estar al tanto de la autenticación del usuario

import { jwtDecode } from 'jwt-decode'; //Importar jwt-decode para decodificar el token

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth_token'; //Variable para guardar el token en el localStorage
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken()); //Variable para guardar el estado del usuario
  private user = new BehaviorSubject<any>(this.getUserFromToken()); //Variable para guardar la información del usuario

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
    this.loggedIn.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getUser(): Observable<any> {
    return this.user.asObservable();
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

  getUserIdFromToken(): string | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken._id; // Campo definido en payload del token
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  }

  getUserNameFromToken(): string | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.username; // Campo definido en payload del token
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  }

  getUserEmailFromToken(): string | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.email; // Campo definido en payload del token
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  }

  getUserRoleFromToken(): string | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.role; // Campo definido en payload del token
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  }

  //De plano ya decodificar el token completo
  getUserFromToken(): any {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  }
  
}
