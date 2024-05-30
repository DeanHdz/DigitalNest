import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ViewProductComponent } from '../../components/view-product/view-product.component';
import { Product } from '../../interfaces/product.interface';
import { Review } from '../../interfaces/review.interface';
import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

import * as bootstrap from 'bootstrap';
import { Category } from '../../interfaces/category.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductCardComponent, ViewProductComponent, NgFor],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css'
})
export class HomePage implements OnInit {

  public products: Product[] = [];

  public selectedProduct: Product = {
    _id: "",
    name: "",
    description: "",
    price: 0,
    img: "",
    stockQuantity: 0
  };

  public selectedProductReviews: Review[] = [];

  public categories: Category[] = [];

  public constructor(private http: HttpClient, private authService: AuthService, private cartService: CartService) { }

  ngOnInit(): void {
    this.fetchProducts();
    //this.fetchCategories();
  }

  public fetchProducts(): void {
    this.http.get("http://localhost:8080/api/products").subscribe((response: any) => {
      this.products = response.products;
    });
  }

  public fetchProductReviews(productId: string): Review[] {
    this.http.get(`http://localhost:8080/api/reviews/product/${productId}`).subscribe((response: any) => {
      console.log(response);
      return response.reviews;
    });
    return [];
  }

  public fetchCategories(): void {
    this.http.get("http://localhost:8080/api/categories").subscribe((response: any) => {
      this.categories = response.categories;
      console.log(response);
    });
  }

  //Se ejecuta por medio de un evento perteneciente a un card de producto
  public viewProduct(product: Product): void {
    this.selectedProduct = product; //Al rescatar el producto, se puede hacer uso de el para mostrarlo en un componente de vista de producto (Modal)

    //Es necesario realizar una peticion de reseñas para ver la valoracion del producto en el modal de vista de producto
    this.selectedProductReviews = this.fetchProductReviews(product._id);

    //Mostrar modal de vista de producto
    const modalElement = document.getElementById('viewProductModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  //Se ejecuta por medio de un evento perteneciente a un componente de vista de producto
  public addToCart(product: Product): void {

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
}
