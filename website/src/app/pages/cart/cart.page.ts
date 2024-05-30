import { Component, OnInit } from '@angular/core';
import { ProductTileComponent } from '../../components/product-tile/product-tile.component';
import { Cart, CartProduct } from '../../interfaces/cart.interface';
import { Product } from '../../interfaces/product.interface';
import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ProductTileComponent, NgFor, NgIf],
  templateUrl: './cart.page.html',
  styleUrl: './cart.page.css'
})
export class CartPage implements OnInit{

  cart: Cart = {
    _id: "",
    userId: "",
    products: []
  };

  products: Product[] = [];

  constructor(private http: HttpClient, private authService: AuthService, private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getCart().subscribe((cart: Cart) => {
      this.cart = cart;
      this.setProducts();
    });
  }

  setProducts(): void {
    if (this.cart.products.length > 0) {
      console.log("productos en el carrito: " + this.cart.products.length);
      this.cart.products.forEach((cartProduct: CartProduct) => {
        this.http.get<Product>(`http://localhost:8080/api/products/${cartProduct.productId}`).subscribe((product: Product) => {
          //Se añade la cantidad de productos al producto
          const extendedProduct: Product = {
            ...product,
            quantity: cartProduct.quantity
          };
          console.log("producto extendido: " + extendedProduct._id + " " + extendedProduct.name + " " + extendedProduct.price + " " + extendedProduct.img + " " + extendedProduct.description + " " + extendedProduct.stockQuantity + " " + extendedProduct.quantity);
          this.products.push(extendedProduct);
        });
      });
    }
    console.log("productos finales: " + this.products);
  }

  addProduct(product: Product): void {
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

    //Si el usuario esta autenticado, se añade el producto al carrito
    this.cartService.addProduct(userId,product._id);
  }

  removeProduct(product: Product): void {
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

    //Si el usuario esta autenticado, se elimina el producto del carrito
    this.cartService.removeProduct(userId,product._id);
  }

}
