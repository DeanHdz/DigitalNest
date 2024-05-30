import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { Cart } from '../interfaces/cart.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Cart = {
    _id: "",
    userId: "",
    products: []
  };

  private cartSubject = new BehaviorSubject<Cart>(this.cart);

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.getUser().subscribe((user: any) => {
      if (user && user._id) {
        this.fetchCart(user._id);
      }
    });
  }

  public getCart(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  public fetchCart(userId: string): void {
    const token = localStorage.getItem('auth_token') ?? "";
    this.http.get(`http://localhost:8080/api/carts/user/${userId}`, {
      headers: {
        "Authorization": token
      }
    }).subscribe({
      next: (response: any) => {
        //console.log(response);
        this.cart = response.cart;
        this.cartSubject.next(this.cart);  // Emitir el nuevo valor del carrito
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  public addProduct(userId: string, productId: string): void {
    const token = localStorage.getItem('auth_token') ?? "";
    this.http.post(`http://localhost:8080/api/carts/user/${userId}/product/${productId}`, {}, {
      headers: {
        "Authorization": token
      }
    }).subscribe({
      next: (response: any) => {
        //console.log(response);
        this.cart = response.cart;
        this.cartSubject.next(this.cart);  // Emitir el nuevo valor del carrito
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  public removeProduct(userId: string, productId: string): void {
    const token = localStorage.getItem('auth_token') ?? "";
    this.http.delete(`http://localhost:8080/api/carts/user/${userId}/product/${productId}`, {
      headers: {
        "Authorization": token
      }
    }).subscribe({
      next: (response: any) => {
        //console.log(response);
        this.cart = response.cart;
        this.cartSubject.next(this.cart);  // Emitir el nuevo valor del carrito
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
}
