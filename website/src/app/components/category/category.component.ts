import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Category } from '../../interfaces/category.interface';
import { ProductCardComponent } from '../product-card/product-card.component';

//import { CategoryService } from '../../services/category.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [NgFor, NgIf, ProductCardComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  constructor(private cartService: CartService) { }

  @Input()
  public category: Category = {
    _id: "",
    name: "",
    products: []
  };

  addToCart(productId: string): void {
    const token = localStorage.getItem('auth_token') ?? "";

    //this.cartService.addProductToCart(productId);
  }

}
