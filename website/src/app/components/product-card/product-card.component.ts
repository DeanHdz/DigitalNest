import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
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

  @Output() public viewProduct: EventEmitter<Product> = new EventEmitter<Product>();

  public onViewProduct(): void {
    this.viewProduct.emit(this.product);
  }
}
