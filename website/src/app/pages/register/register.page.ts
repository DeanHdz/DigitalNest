import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.page.html',
  styleUrl: './register.page.css'
})
export class RegisterPage {

  constructor(private http: HttpClient) { }

  //Mensaje de modal, sirve para mostrar mensajes de error
  modalMessage: string = "";

  nameInput: string = "";
  emailInput: string = "";
  passInput: string = "";
  passInputVerify: string = "";

  public onRegister(): void {

    //Si contraseñas no coinciden, muestra un modal
    if (this.passInput != this.passInputVerify) {
      this.modalMessage = "Las contraseñas no coinciden";
      const modalElement = document.getElementById("registerModal");
      if (modalElement){
        const modalInstance = new Modal(modalElement);
        modalInstance.show();
      }
      return;
    }

    this.http.post("http://localhost:8080/api/auth/register", {
      "username": this.nameInput,
      "email": this.emailInput,
      "password": this.passInput
    }).subscribe({ 
      next: (response : any) => {
        console.log(response);
      },
      error: (error : any) => {
        console.log(error);
      }
    });
  }

}
