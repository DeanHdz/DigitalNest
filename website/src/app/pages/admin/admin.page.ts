import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../interfaces/category.interface';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './admin.page.html',
  styleUrl: './admin.page.css'
})
export class AdminPage {

  //Alta de categoria
  categoryInput: string = '';

  //Modificacion de categoria
  newCategoryInput: string = '';
  categoryToUpdate: string = '';

  //Baja de categoria
  categoryToDelete: string = '';

  //Alta de producto
  productNameInput: string = '';
  productDescriptionInput: string = '';
  productPriceInput: number = 0;
  productImgInput: string = '';
  productStockQuantityInput: number = 0;
  categoryToInsertProduct: string = '';

  //Modificacion de producto
  productToUpdate: string = '';
  newProductNameInput: string = '';
  newProductDescriptionInput: string = '';
  newProductPriceInput: number = 0;
  newProductImgInput: string = '';
  newProductStockQuantityInput: number = 0;
  newCategoryToInsertProduct: string = '';

  //Baja de producto
  productToDelete: string = '';

  //Arreglo de categorias conteniendo los productos
  categories: Category[] = [];

  //Productos
  products: Product[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories() {
    const token = localStorage.getItem("auth_token") ?? ""; //Nada asegura si el token existe o no, se ponen 2 signos para que el valor sea "" si no existe
    this.http.get('http://localhost:8080/api/categories', {
      headers: {
        "Authorization": token
      }
    }).subscribe({
      next: (response: any) => {
        this.categories = response.categories;
        //Hacer un arreglo de productos conteniendo los productos de todas las categorias
        this.products = this.categories.map((category: Category) => {
          return category.products;
        }).flat();
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  onSubmitCreateCategory() {
    const token = localStorage.getItem("auth_token") ?? ""; //Nada asegura si el token existe o no, se ponen 2 signos para que el valor sea "" si no existe
    this.http.post('http://localhost:8080/api/categories', {
      "name": this.categoryInput,
    }, {
      headers: {
        "Authorization": token
      }
    }).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  onSubmitUpdateCategory() {
    const token = localStorage.getItem("auth_token") ?? ""; //Nada asegura si el token existe o no, se ponen 2 signos para que el valor sea "" si no existe
    this.http.put(`http://localhost:8080/api/categories/${this.categoryToUpdate}`, {
      name: this.newCategoryInput,
      headers: {
        "Authorization": token
      }
    }).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  onSubmitDeleteCategory() {
    const token = localStorage.getItem("auth_token") ?? ""; //Nada asegura si el token existe o no, se ponen 2 signos para que el valor sea "" si no existe
    this.http.delete(`http://localhost:8080/api/categories/${this.categoryToDelete}`, {
      headers: {
        "Authorization": token
      }
    }).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  onSubmitCreateProduct() {
    const token = localStorage.getItem("auth_token") ?? ""; //Nada asegura si el token existe o no, se ponen 2 signos para que el valor sea "" si no existe
    this.http.post('http://localhost:8080/api/products', {
      name: this.productNameInput,
      description: this.productDescriptionInput,
      price: this.productPriceInput,
      img: this.productImgInput,
      stockQuantity: this.productStockQuantityInput,
      categoryId: this.categoryToInsertProduct,
      headers: {
        "Authorization": token
      }
    }).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  onSubmitUpdateProduct() {
    const token = localStorage.getItem("auth_token") ?? ""; //Nada asegura si el token existe o no, se ponen 2 signos para que el valor sea "" si no existe
    this.http.put(`http://localhost:8080/api/products/${this.productToUpdate}`, {
      name: this.newProductNameInput,
      description: this.newProductDescriptionInput,
      price: this.newProductPriceInput,
      img: this.newProductImgInput,
      stockQuantity: this.newProductStockQuantityInput,
      categoryId: this.newCategoryToInsertProduct,
      headers: {
        "Authorization": token
      }
    }).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  onSubmitDeleteProduct() {
    const token = localStorage.getItem("auth_token") ?? ""; //Nada asegura si el token existe o no, se ponen 2 signos para que el valor sea "" si no existe
    this.http.delete(`http://localhost:8080/api/products/${this.productToDelete}`, {
      headers: {
        "Authorization": token
      }
    }).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

}
