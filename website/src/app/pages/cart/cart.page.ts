import { Component, OnInit } from '@angular/core';
import { ProductTileComponent } from '../../components/product-tile/product-tile.component';
import { Cart, CartProduct } from '../../interfaces/cart.interface';
import { NgFor, NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ProductTileComponent, NgFor, NgIf],
  templateUrl: './cart.page.html',
  styleUrl: './cart.page.css'
})
export class CartPage implements OnInit {

  cart: Cart = {
    _id: "",
    userId: "",
    products: []
  };

  constructor(private authService: AuthService, private cartService: CartService) { }

  ngOnInit(): void {
    //Verificar si el usuario esta autenticado recuperando el id del usuario desde el token
    const userId = this.authService.getUserIdFromToken();
    if (!userId) {
      window.location.href = "/login";
      return;
    }
    this.cartService.getCart().subscribe((cart: Cart) => {
      this.cart = cart; // Actualizar el carrito
    });
  }

  checkOut(): void {
    //Si no hay un token en la sesion actual, se redirige al usuario a la pagina de login
    if (!this.authService.hasToken()) {
      window.location.href = "/login";
      return;
    }

    //Verificar si el usuario esta autenticado recuperando el id del usuario desde el token
    const userId = this.authService.getUserIdFromToken();
    if (!userId) {
      window.location.href = "/login";
      return;
    }

    //Si el usuario esta autenticado, se redirige al usuario a la pagina de checkout
    window.location.href = "/payment";
  }
  
  addProduct(product: CartProduct): void {
    //Si no hay un token en la sesion actual, se redirige al usuario a la pagina de login
    if (!this.authService.hasToken()) {
      window.location.href = "/login";
      return;
    }

    //Verificar si el usuario esta autenticado recuperando el id del usuario desde el token
    const userId = this.authService.getUserIdFromToken();
    if (!userId) {
      window.location.href = "/login";
      return;
    }

    if(!product){
      console.log("No se puede añadir un producto nulo");
      return;
    }

    //Si el usuario esta autenticado, se añade el producto al carrito
    this.cartService.addProduct(userId, product.productId);
    this.fetchCart(userId); // Volver a obtener el carrito para reflejar cambios
  }

  removeProduct(product: CartProduct): void {
    //Si no hay un token en la sesion actual, se redirige al usuario a la pagina de login
    if (!this.authService.hasToken()) {
      window.location.href = "/login";
      return;
    }

    //Verificar si el usuario esta autenticado recuperando el id del usuario desde el token
    const userId = this.authService.getUserIdFromToken();
    if (!userId) {
      window.location.href = "/login";
      return;
    }

    if(!product){
      console.log("No se puede añadir un producto nulo");
      return;
    }

    //Si el usuario esta autenticado, se elimina el producto del carrito
    this.cartService.removeProduct(userId, product.productId);
    this.fetchCart(userId); // Volver a obtener el carrito para reflejar cambios
  }

  fetchCart(userId: string): void {
    this.cartService.fetchCart(userId);
  }

}
