import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { NgIf, NgClass } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input()
  public product: Product = {
    _id: "",
    name: "",
    description: "",
    price: 0,
    img: "",
    stockQuantity: 0
  };

  @Output() public addToCart: EventEmitter<Product> = new EventEmitter<Product>();

  public onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
}
