import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';   // Asegúrate de que la ruta sea correcta
import { SolicitudService } from '../../services/solicitud.service';   // Asegúrate de que la ruta sea correcta
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { EmpresaService } from '../../services/empresa.service';
import { Empresa } from '../../models/empresa';
import { Linea } from '../../models/linea';
import { LineaService } from '../../services/linea.service';

@Component({
  selector: 'app-solicitud',
  standalone: true,
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css'],
  providers: [MessageService],
  imports: [ButtonModule,TableModule,FormsModule,DropdownModule],
})
export class SolicitudComponent implements OnInit {
  solicitud: any = { estudiante: {}, empresa: {}, linea: {} };
  empresas: Empresa[] = [];
  selectedLinea: Linea | null = null;
  userInfo: any = {};
  lineas: Linea[] = [];
  selectedEmpresa: Linea | null = null;


  constructor(
    private authService: AuthService,
    private empresaService: EmpresaService,
    private solicitudService: SolicitudService,
    private messageService: MessageService,
    private lineaService: LineaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargarDatosUsuario();
    this.listarEmpresas();
    this.listarLineas();
  }

  cargarDatosUsuario() {
    this.authService.getUserInfo().subscribe(
      (data) => {
        this.userInfo = data;
        this.solicitud.estudiante.nombre = data.namenombreCompleto; 

      },
      (error) => {
        console.error('Error al cargar datos del usuario', error);
      }
    );
  }

  listarEmpresas() {
    this.empresaService.getEmpresas().subscribe(
      (data) => {
        this.empresas = data;
        console.log(this.empresas);
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error al cargar empresas',
          detail: error.message || 'Error al cargar las empresas',
        });
      }
    );
  }

  listarLineas(): void {
    this.lineaService.getLineas().subscribe(
      (data: Linea[]) => {
        this.lineas = data;
        console.log('Líneas cargadas:', this.lineas);
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar las líneas: ' + error.message
        });
      }
    );
  }

  onSubmitSolicitud() {
    this.solicitudService.createSolicitud(this.solicitud).subscribe(
      (response) => {
        console.log('Solicitud creada con éxito', response);
      },
      (error) => {
        console.error('Error al crear solicitud', error);
      }
    );
  }

  onClearForm() {
    this.solicitud = { empresa: {}, linea: {} };  // Reiniciar formulario
  }
}
