import { Component } from '@angular/core';
import { OrderTileComponent } from '../../components/order-tile/order-tile.component';
import { Order, OrderProduct } from '../../interfaces/order.interface';
import { NgIf, NgFor } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [OrderTileComponent, NgIf, NgFor],
  templateUrl: './history.page.html',
  styleUrl: './history.page.css'
})
export class HistoryPage {

  public orders: Order[] = [];

  public constructor(private authService: AuthService, private http: HttpClient) { }

  public ngOnInit(): void {
    const userId = this.authService.getUserIdFromToken();
    if (!userId) {
      window.location.href = "/login";
      return;
    }
    this.fetchOrders(userId);
  }

  public fetchOrders(userId: string): void {
    const token = localStorage.getItem('auth_token') ?? "";
    this.http.get(`http://localhost:8080/api/orders/user/${userId}`, {
      headers: {
        "Authorization": token
      }
    }).subscribe({
      next: (response: any) => {
        console.log(response);
        this.orders = response.orders;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

}
