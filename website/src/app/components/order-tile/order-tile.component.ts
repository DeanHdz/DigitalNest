import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Order, OrderProduct } from '../../interfaces/order.interface';

@Component({
  selector: 'app-order-tile',
  standalone: true,
  imports: [],
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
