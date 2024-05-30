import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { Cart } from '../../interfaces/cart.interface';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;
  user: User = {
    _id: '',
    username: '',
    email: '',
    role: ''
  };
  cart: Cart = {
    _id: '',
    userId: '',
    products: []
  };

  constructor(private authService: AuthService, private cartService: CartService) { }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(
      (loggedIn: boolean) => {
        this.isLoggedIn = loggedIn;
      }
    );
    this.authService.getUser().subscribe(
      (user: User) => {
        this.user = user;
      }
    );
    this.cartService.getCart().subscribe(
      (cart: Cart) => {
        console.log(cart);
        this.cart = cart;
        console.log(this.cart);
      }
    );
  }

  public onLogout(): void {
    this.authService.logout();
    window.location.href = "/login";
  }
}
