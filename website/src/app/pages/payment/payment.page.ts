import { Component, OnInit } from '@angular/core';
import { ProductTileComponent } from '../../components/product-tile/product-tile.component';
import { Cart, CartProduct } from '../../interfaces/cart.interface';
import { NgFor, NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, ProductTileComponent],
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.css']
})
export class PaymentPage implements OnInit {
  cart: Cart = {
    _id: "",
    userId: "",
    products: []
  };

  products: Product[] = []; // Declarar `products` como propiedad de la clase
  shippingAddress: string = "";
  totalPrice: number = 0;

  constructor(private authService: AuthService, private cartService: CartService) { }

  ngOnInit(): void {
    const userId = this.authService.getUserIdFromToken();
    if (userId) {
      this.cartService.getCart().subscribe(
        (cart: Cart) => {
          this.cart = cart;
        }
      );
      this.cartService.getProducts().subscribe(
        (products: Product[]) => {
          this.products = products;
          this.totalPrice = this.calculateTotalPrice();
        }
      );
    }
  }

  calculateTotalPrice(): number {
    let totalPrice = 0;
    let productsExt: Product[] = [];

    this.products.forEach(product => {
      const cartProduct = this.cart.products.find(p => p.productId === product._id);
      if (cartProduct) {
        product.quantity = cartProduct.quantity;
        productsExt.push(product);
      }
    });

    productsExt.forEach(product => {
      console.log("Product: ", product);
      totalPrice += product.price * (product.quantity ?? 1);
    });

    console.log("Total Price: ", totalPrice);
    console.log("Cart Products: ", productsExt);
    console.log("Cart: ", this.cart.products);
    console.log("Products: ", this.products);
    return totalPrice;
  }

  purchase(): void {
    // Si no hay un token en la sesión actual, se redirige al usuario a la página de login
    if (!this.authService.hasToken()) {
      window.location.href = "/login";
      return;
    }

    // Verificar si el usuario está autenticado recuperando el id del usuario desde el token
    const userId = this.authService.getUserIdFromToken();
    if (!userId) {
      window.location.href = "/login";
      return;
    }

    const products = this.cart.products;
    console.log("Products: ", products);
    const TotalPrice = this.totalPrice;
    const shippingAddress = this.shippingAddress;
    const status = "en proceso de entrega";

    // Crear una nueva orden
    console.log("Creating order..." + userId + " " + products + " " + TotalPrice + " " + shippingAddress + " " + status);
    this.cartService.createOrder(userId, products, TotalPrice, shippingAddress, status);

    if(shippingAddress === ""){
      alert("Por favor, ingrese una dirección de envío válida.");
    }
    else{
      window.location.href = "/history";
    }
  }
}
