import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) { }

  fetchCategories(): Observable<any> {
    const token = localStorage.getItem(this.tokenKey) ?? "";
    return this.http.get("http://localhost:8080/api/categories", {
      headers: {
        "Authorization": token
      }
    });
  }

  fetchProducts(): Observable<any> {
    const token = localStorage.getItem(this.tokenKey) ?? "";
    return this.http.get("http://localhost:8080/api/products", {
      headers: {
        "Authorization": token
      }
    });
  }

  createCategory(name: string): Observable<any> {
    const token = localStorage.getItem(this.tokenKey) ?? "";
    return this.http.post("http://localhost:8080/api/categories", {
      "name": name
    }, {
      headers: {
        "Authorization": token
      }
    });
  }

  updateCategoryName(_id: string, name: string): Observable<any> {
    const token = localStorage.getItem(this.tokenKey) ?? "";
    return this.http.put(`http://localhost:8080/api/categories/${_id}`, {
      "name": name
    }, {
      headers: {
        "Authorization": token
      }
    });
  }

  insertProductIntoCategory(_id: string, product_id: string): Observable<any> {
    const token = localStorage.getItem(this.tokenKey) ?? "";
    return this.http.put(`http://localhost:8080/api/categories/${_id}/products`, {
      "product_id": product_id
    }, {
      headers: {
        "Authorization": token
      }
    });
  }

  removeProductFromCategory(_id: string, product_id: string): Observable<any> {
    const token = localStorage.getItem(this.tokenKey) ?? "";
    return this.http.delete(`http://localhost:8080/api/categories/${_id}/products/${product_id}`, {
      headers: {
        "Authorization": token
      }
    });
  }

  deleteCategory(_id: string): Observable<any> {
    const token = localStorage.getItem(this.tokenKey) ?? "";
    return this.http.delete(`http://localhost:8080/api/categories/${_id}`, {
      headers: {
        "Authorization": token
      }
    });
  }

  createProduct(name: string, description: string, price: number, img: File, stockQuantity: number): Observable<any> {
    const token = localStorage.getItem(this.tokenKey) ?? "";
    return this.http.post("http://localhost:8080/api/products", {
      "name": name,
      "description": description,
      "price": price,
      "img": img,
      "stockQuantity": stockQuantity
    }, {
      headers: {
        "Authorization": token
      }
    });
  }

  updateProduct(_id: string, name: string, description: string, price: number, img: File, stockQuantity: number): Observable<any> {
    const token = localStorage.getItem(this.tokenKey) ?? "";
    return this.http.put(`http://localhost:8080/api/products/${_id}`, {
      "name": name,
      "description": description,
      "price": price,
      "img": img,
      "stockQuantity": stockQuantity
    }, {
      headers: {
        "Authorization": token
      }
    });
  }

  deleteProduct(_id: string): Observable<any> {
    const token = localStorage.getItem(this.tokenKey) ?? "";
    return this.http.delete(`http://localhost:8080/api/products/${_id}`, {
      headers: {
        "Authorization": token
      }
    });
  }
}
