import { NgIf } from '@angular/common';
import { Message } from 'primeng/api';

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../services/auth.service';

import { Route, Router } from '@angular/router';
import { MessageService } from 'primeng/api';;
import { PasswordModule } from 'primeng/password';
import { RouterModule } from '@angular/router';  // Para routerLink

@Component({
  selector: 'app-login',
  standalone: true,
  imports:[  FormsModule,
    InputTextModule,
    CheckboxModule,
    DividerModule,
    ButtonModule,
    CardModule,
    DialogModule,
    ToastModule,
    InputGroupAddonModule,
    InputGroupModule,
    PasswordModule,
    RouterModule
  ],

  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  styles: [`
    :host ::ng-deep .pi-eye,
    :host ::ng-deep .pi-eye-slash {
        transform:scale(1.6);
        margin-right: 1rem;
        color: var(--primary-color) !important;
    }
`]
})
export class LoginComponent {
  username:string='';
  password:string='';
  value!: string;
  private tokenKey = 'authToken';
  valCheck: string[] = ['remember'];
  errorMessage: string = '';
  userInfo: any = {};
  rememberMe: boolean = false;

  constructor(private authService: AuthService, private router: Router, private messageService: MessageService) {}

  onLogin(): void {
    this.authService.login(this.username, this.password,this.rememberMe).subscribe(
      (response) => {
        // Al recibir el token del backend, guardarlo en localStorage
        this.authService.storeToken(response.token);
  
        // Redirigir al usuario a la página principal o a otra ruta protegida
        this.router.navigate(['/']);
      },
      (error) => {
        // Manejar errores en el inicio de sesión
        console.error('Error en el inicio de sesión:', error);
        this.errorMessage = 'Credenciales incorrectas. Intente nuevamente.';
      }
    );
  }
  

  loadUserInfo(): void {
    this.authService.getUserInfo().subscribe(
        (data) => {
            console.log(data);
            this.userInfo = data; // Almacena la respuesta del backend en userInfo
        },
        (error) => {
            console.error(error);
            this.errorMessage = 'Error al cargar la información del usuario.';
        }
    );
}


showErrorToast(error: any): void {

  const message: Message = {
    severity: 'error',
    summary: 'Login Failed',
    detail: error.message
  };


  this.messageService.add(message);
}
logout():void {
    this.authService.logout();
    sessionStorage.removeItem('jwtToken');
}

  isrecuperarview: boolean = false;
  isnocredencialview: boolean = false;
  isSuccessView: boolean = false;

  userayudaObj: any = {
    EmailId: ''
  };

  showRecoverView() {
    this.isrecuperarview = true;
    this.isnocredencialview = false;
  }

  showNoCredentialsView() {
    this.isrecuperarview = false;
    this.isnocredencialview = true;
  }

  onSubmitRecovery() {
    // Aquí puedes agregar la lógica para enviar el correo de recuperación
    console.log('Correo enviado a:', this.userayudaObj.EmailId);
    this.isSuccessView = true;
    this.isrecuperarview = false;
    this.isnocredencialview = false;
  }
}

