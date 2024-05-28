import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Modal } from 'bootstrap';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.css']
})
export class RegisterPage {

  constructor(private authService: AuthService) { }

  // Mensaje de modal, sirve para mostrar mensajes de error
  modalMessage: string = "";

  nameInput: string = "";
  emailInput: string = "";
  passInput: string = "";
  passInputVerify: string = "";

  public onRegister(): void {

    // Si algún campo está vacío, muestra un modal
    if (this.nameInput === "" || this.emailInput === "" || this.passInput === "" || this.passInputVerify === "") {
      this.modalMessage = "Por favor, rellene todos los campos";
      this.showModal();
      return;
    }

    // Si las contraseñas no coinciden, muestra un modal
    if (this.passInput !== this.passInputVerify) {
      this.modalMessage = "Las contraseñas no coinciden";
      this.showModal();
      return;
    }

    // Llamar al servicio de registro
    this.authService.register(this.nameInput, this.emailInput, this.passInput).subscribe({
      next: (response) => {
        console.log(response);
        // Redirigir a la página de login
        window.location.href = "/login";
      },
      error: (error) => {
        console.error(error);
        this.modalMessage = "Hubo un error al registrar el usuario";
        this.showModal();
      }
    });
  }

  private showModal(): void {
    const modalElement = document.getElementById("registerModal");
    if (modalElement) {
      const modalInstance = new Modal(modalElement);
      modalInstance.show();
    }
  }
}
