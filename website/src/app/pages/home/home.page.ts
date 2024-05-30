import { Component } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { Product } from '../../interfaces/product.interface';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductCardComponent, NgFor],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css'
})
export class HomePage {
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

  public onAddToCart(product: Product): void {
    console.log(product);
  }
}
