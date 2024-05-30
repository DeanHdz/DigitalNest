import { Component, Input } from '@angular/core';
import { Order, OrderProduct } from '../../interfaces/order.interface';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-order-tile',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './order-tile.component.html',
  styleUrl: './order-tile.component.css'
})
export class OrderTileComponent{

  @Input() order: Order ={
    _id: "",
    userId: "",
    products: [],
    totalPrice: 0,
    shippingAddress: "",
    status: ""
  };

}
