import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-product-tile',
  standalone: true,
  imports: [],
  templateUrl: './product-tile.component.html',
  styleUrl: './product-tile.component.css'
})
export class ProductTileComponent {

  @Input() public product: Product = {
    _id: '',
    name: '',
    price: 0,
    img: '',
    description: '',
    stockQuantity: 0,
    quantity: 0
  };

  @Output() public removeProduct: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() public addProduct: EventEmitter<Product> = new EventEmitter<Product>();

  public onRemoveProduct(): void {
    this.removeProduct.emit(this.product);
  }

  public onAddProduct(): void {
    this.addProduct.emit(this.product);
  }
}
