import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { LoginPage } from './pages/login/login.page';
import { RegisterPage } from './pages/register/register.page';
import { ErrorPage } from './pages/error/error.page';

export const routes: Routes = [
    {path: "", redirectTo: "home", pathMatch: "full"},
    {path: "home", component: HomePage},
    {path: "login", component: LoginPage},
    {path: "register", component: RegisterPage},
    {path: "error", component: ErrorPage},
    {path: "**", redirectTo: "error", pathMatch: "full"},
];
