import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { Cart } from '../interfaces/cart.interface';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Cart = {
    _id: "",
    userId: "",
    products: []
  };

  private products: Product[] = [];

  private productsSubject = new BehaviorSubject<Product[]>(this.products);
  private cartSubject = new BehaviorSubject<Cart>(this.cart);

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.getUser().subscribe((user: any) => {
      if (user && user._id) {
        this.fetchCart(user._id);
        this.fetchProducts(user._id);
      }
    });
  }

  public getCart(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  public getProducts(): Observable<Product[]> {
    return this.productsSubject.asObservable();
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

  public fetchProducts(userId: string): void {
    const token = localStorage.getItem('auth_token') ?? "";
    this.http.get(`http://localhost:8080/api/carts/user/${userId}/products`, {
      headers: {
        "Authorization": token
      }
    }).subscribe({
      next: (response: any) => {
        //console.log(response);
        this.products = response.products;
        this.productsSubject.next(this.products);  // Emitir el nuevo valor del listado de productos
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  //Eliminar el carrito del usuario
  public clearCart(userId: string): void {
    const token = localStorage.getItem('auth_token') ?? "";
    this.http.delete(`http://localhost:8080/api/carts/user/${userId}`, {
      headers: {
        "Authorization": token
      }
    }).subscribe({
      next: (response: any) => {
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

  public createOrder(userId: string, products: Product[], totalPrice: number, shippingAddress: string, status: string): void {
    const token = localStorage.getItem('auth_token') ?? "";
    this.http.post(`http://localhost:8080/api/orders`, {
      userId,
      products,
      totalPrice,
      shippingAddress,
      status
    }, {
      headers: {
        "Authorization": token
      }
    }).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
}
