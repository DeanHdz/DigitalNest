import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { CartProduct } from '../../interfaces/cart.interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-tile',
  standalone: true,
  imports: [],
  templateUrl: './product-tile.component.html',
  styleUrl: './product-tile.component.css'
})
export class ProductTileComponent implements OnInit{

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchProduct(this.product.productId);
  }

  public fetchProduct(productId: string): void {
    this.http.get(`http://localhost:8080/api/products/${productId}`).subscribe({
      next: (response: any) => {
        this.productExt = response.product;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  public productExt: Product = {
    _id: '',
    name: 'Product Name',
    price: 0,
    img: 'https://picsum.photos/200',
    description: '',
    stockQuantity: 0,
    quantity: 0
  };

  @Input() public product: CartProduct = {
    productId: '',
    quantity: 0
  };

  @Output() public removeProduct: EventEmitter<CartProduct> = new EventEmitter<CartProduct>();
  @Output() public addProduct: EventEmitter<CartProduct> = new EventEmitter<CartProduct>();

  public onRemoveProduct(): void {
    this.removeProduct.emit(this.product);
  }

  public onAddProduct(): void {
    this.addProduct.emit(this.product);
  }
}
