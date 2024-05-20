import { Injectable } from '@angular/core';
import { Cart } from '../interfaces/cart.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cart: Cart = {
    userId: "",
    products: []
  };

  constructor(private http: HttpClient) { }

  public fetchCart(userId: string): void {
    const token = localStorage.getItem('auth_token') ?? "";
    this.http.get(`http://localhost:8080/api/carts/user/${userId}`, {
      headers: {
        "Authorization": token
      }
    }).subscribe({
      next: (response: any) => {
        console.log(response);
        this.cart = response.cart;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

}