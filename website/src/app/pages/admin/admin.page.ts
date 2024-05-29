import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminService } from '../../services/admin.service';

import { Category } from '../../interfaces/category.interface';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './admin.page.html',
  styleUrl: './admin.page.css'
})
export class AdminPage implements OnInit {

  //Alta de categoria
  categoryInput: string = '';

  //Modificacion de categoria
  newCategoryInput: string = '';
  categoryToUpdate: string = '';

  //Insercion de producto en categoria
  productToInsert: string = '';
  categoryToInsertProduct: string = '';

  //Remocion de producto de categoria
  productToRemove: string = '';
  categoryToRemoveProduct: string = '';

  //Baja de categoria
  categoryToDelete: string = '';

  //Alta de producto
  productNameInput: string = '';
  productDescriptionInput: string = '';
  productPriceInput: number = 0;
  productImgInput: string = 'https://picsum.photos/200';
  productStockQuantityInput: number = 0;

  //Modificacion de producto
  productToUpdate: string = '';
  newProductNameInput: string = '';
  newProductDescriptionInput: string = '';
  newProductPriceInput: number = 0;
  newProductImgInput: string = 'https://picsum.photos/200';
  newProductStockQuantityInput: number = 0;

  //Baja de producto
  productToDelete: string = '';

  //Arreglo de categorias conteniendo los _ids de productos
  categories: Category[] = [];

  //Productos
  products: Product[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.fetchCategories();
    this.fetchProducts();
  }

  fetchCategories() {
    this.adminService.fetchCategories().subscribe({
      next: (response: any) => {
        this.categories = response.categories;
        this.products = this.categories.map((category: Category) => {
          return category.products;
        }).flat();
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  fetchProducts() {
    this.adminService.fetchProducts().subscribe({
      next: (response: any) => {
        this.products = response.products;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  onSubmitCreateCategory() {
    this.adminService.createCategory(this.categoryInput).subscribe({
      next: (response: any) => {
        console.log(response);
        window.location.href = "/admin";
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  onSubmitUpdateCategoryName() {
    this.adminService.updateCategoryName(this.categoryToUpdate, this.newCategoryInput).subscribe({
      next: (response: any) => {
        console.log(response);
        window.location.href = "/admin";
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  onSubmitInsertProductIntoCategory() {
    this.adminService.insertProductIntoCategory(this.categoryToInsertProduct, this.productToInsert).subscribe({
      next: (response: any) => {
        console.log(response);
        window.location.href = "/admin";
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  onSubmitRemoveProductFromCategory(){
    this.adminService.removeProductFromCategory(this.categoryToRemoveProduct, this.productToRemove).subscribe({
      next: (response: any) => {
        console.log(response);
        window.location.href = "/admin";
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  onSubmitDeleteCategory() {
    this.adminService.deleteCategory(this.categoryToDelete).subscribe({
      next: (response: any) => {
        console.log(response);
        window.location.href = "/admin";
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  onSubmitCreateProduct() {
    this.adminService.createProduct(this.productNameInput, this.productDescriptionInput, this.productPriceInput, this.productImgInput, this.productStockQuantityInput).subscribe({
      next: (response: any) => {
        console.log(response);
        window.location.href = "/admin";
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  onSubmitUpdateProduct() {
    this.adminService.updateProduct(this.productToUpdate, this.newProductNameInput, this.newProductDescriptionInput, this.newProductPriceInput, this.newProductImgInput, this.newProductStockQuantityInput).subscribe({
      next: (response: any) => {
        console.log(response);
        window.location.href = "/admin";
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  onSubmitDeleteProduct() {
    this.adminService.deleteProduct(this.productToDelete).subscribe({
      next: (response: any) => {
        console.log(response);
        window.location.href = "/admin";
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

}
