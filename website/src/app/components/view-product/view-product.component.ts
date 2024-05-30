import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { Review } from '../../interfaces/review.interface';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-product',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.css'
})
export class ViewProductComponent {
  
  @Input()
  public product: Product = {
    _id: "",
    name: "",
    description: "",
    price: 0,
    img: "",
    stockQuantity: 0
  };

  comment = '';
  rating = 0;

  @Input()
  public reviews: Review[] = [];

  @Output() public addToCart: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() public addReview: EventEmitter<{comment: String, rating: number}> = new EventEmitter<{comment: String, rating: number}>();

  public onAddToCart(): void {
    this.addToCart.emit(this.product);
  }

  public onAddReview(): void {
    this.addReview.emit({comment: this.comment, rating: this.rating});
  }
}
