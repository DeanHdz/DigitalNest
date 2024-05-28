import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { LoginPage } from './pages/login/login.page';
import { RegisterPage } from './pages/register/register.page';
import { ErrorPage } from './pages/error/error.page';
import { AdminPage } from './pages/admin/admin.page';
import { CartPage } from './pages/cart/cart.page';
import { HistoryPage } from './pages/history/history.page';
import { PaymentPage } from './pages/payment/payment.page';

export const routes: Routes = [
    {path: "", redirectTo: "home", pathMatch: "full"},
    {path: "home", component: HomePage},
    {path: "login", component: LoginPage},
    {path: "register", component: RegisterPage},
    {path: "admin", component: AdminPage},
    {path: "cart", component: CartPage},
    {path: "history", component: HistoryPage},
    {path: "payment", component: PaymentPage},
    {path: "error", component: ErrorPage},
    {path: "**", redirectTo: "error", pathMatch: "full"},
];
