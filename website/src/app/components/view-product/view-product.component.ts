import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-view-product',
  standalone: true,
  imports: [],
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

  @Output() public addToCart: EventEmitter<Product> = new EventEmitter<Product>();

  public onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
}
