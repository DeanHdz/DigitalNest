import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Modal } from 'bootstrap';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css'
})
export class LoginPage {

  constructor(private authService: AuthService) { }

  // Mensaje de modal, sirve para mostrar mensajes de error
  modalMessage: string = "";

  emailInput: string = "";
  passInput: string = "";

  //Lamar al servicio de login
  public onLogin(): void {

    if (this.emailInput === "" || this.passInput === "") {
      this.modalMessage = "Por favor, rellene todos los campos";
      this.showModal();
      return;
    }

    this.authService.login(this.emailInput, this.passInput).subscribe({
      next: (response) => {
        console.log(response);
        this.authService.setToken(response.token);
        window.location.href = "/home";
      },
      error: (error) => {
        console.error(error);
        this.modalMessage = "Hubo un error al iniciar sesión";
        this.showModal();
      }
    });
  }

  private showModal(): void {
    const modalElement = document.getElementById("loginModal");
    if (modalElement) {
      const modalInstance = new Modal(modalElement);
      modalInstance.show();
    }
  }
}