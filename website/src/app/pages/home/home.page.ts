import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ViewProductComponent } from '../../components/view-product/view-product.component';
import { Product } from '../../interfaces/product.interface';
import { NgFor } from '@angular/common';

import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductCardComponent, ViewProductComponent, NgFor],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css'
})
export class HomePage implements OnInit {

  public products: Product[] = [
    {
      _id: "1",
      name: "Product 1",
      description: "Description of product 1",
      price: 10,
      img: "https://picsum.photos/200",
      stockQuantity: 10
    },
    {
      _id: "2",
      name: "Product 2",
      description: "Description of product 2",
      price: 20,
      img: "https://via.placeholder.com/150",
      stockQuantity: 20
    },
    {
      _id: "3",
      name: "Product 3",
      description: "Description of product 3",
      price: 30,
      img: "https://via.placeholder.com/150",
      stockQuantity: 30
    }
  ];

  public selectedProduct: Product = {
    _id: "",
    name: "",
    description: "",
    price: 0,
    img: "",
    stockQuantity: 0
  };

  ngOnInit(): void {

  }

  //Se ejecuta por medio de un evento perteneciente a un card de producto
  public viewProduct(product: Product): void {
    this.selectedProduct = product; //Al rescatar el producto, se puede hacer uso de el para mostrarlo en un componente de vista de producto (Modal)

    //Es necesario realizar una peticion de reseñas para ver la valoracion del producto en el modal de vista de producto

    //Mostrar modal de vista de producto
    const modalElement = document.getElementById('viewProductModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  //Se ejecuta por medio de un evento perteneciente a un componente de vista de producto
  public addToCart(product: Product): void {
    console.log("Product added to cart", product);
  }
}
