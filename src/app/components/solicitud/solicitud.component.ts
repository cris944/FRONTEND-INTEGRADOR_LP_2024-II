import { Component, OnInit } from '@angular/core';
import { SolicitudService } from '../../services/solicitud.service';
import { Solicitud } from '../../models/solicitud';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { Empresa } from '../../models/empresa';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css'],
  standalone: true,
  
  providers: [MessageService],
  imports: [
    CommonModule,
    FormsModule, 
    HttpClientModule, 
    InputTextModule, 
    DropdownModule,
    ButtonModule, 
    TableModule
  ],
  
})
export class SolicitudComponent implements OnInit {
  solicitudes: Solicitud[] = [];
  solicitud: Solicitud = {
    id: 0,
    estudiante: {
      id: 0,
      nombre: ''
    },
    empresa: {
      id: 0,
      nombre: ''
    },
    linea: {
      id: 0,
      nombre: ''
    },
    estado: 'I', 
    fechaCreacion: '' 
  };
  
  mensaje: string = '';
  empresas: any[] = []; 
  lineas: any[] = [];   
  acceptTerms = false;
  userInfo: any = {};
  errorMessage: string = '';

  constructor(private solicitudService: SolicitudService,private authService: AuthService ) {}

  ngOnInit(): void {

    this.solicitudService.obtenerDatosIniciales().subscribe(
      (data) => {

        this.solicitud.estudiante = data.datosIniciales.estudiante; 
        this.empresas = data.datosIniciales.empresas;              
        this.lineas = data.datosIniciales.lineas;                  
      },
      (error) => {
        console.error('Error al cargar los datos iniciales:', error);
      }
    );
  }

  onClearForm(): void {

    this.solicitud = {
      id: 0,
      estudiante: { id: 0, nombre: '' },
      empresa: { id: 0, nombre: ''},
      linea: { id: 0, nombre: '' },
      estado: 'I',
      fechaCreacion: '',
    };
    this.acceptTerms = false;
  }

  onSubmitSolicitud(): void {
    if (!this.acceptTerms) {
      alert('Debe aceptar los términos y condiciones antes de enviar.');
      return;
    }

    this.solicitudService.guardarSolicitud(this.solicitud).subscribe(
      (response) => {
        alert('Solicitud enviada correctamente.');
        this.onClearForm();
      },
      (error) => {
        alert('Error al enviar la solicitud: ' + error);
      }
    );
  }
  loadUserInfo(): void {
    this.authService.getUserInfo().subscribe(
        (data) => {
            console.log(data);
            this.userInfo = data; 
        },
        (error) => {
            console.error(error);
            this.errorMessage = 'Error al cargar la información del usuario.';
        }
    );
}
}