import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-mis-archivos',
  standalone: true,
  templateUrl: './mis-archivos.component.html',
  styleUrls: ['./mis-archivos.component.css'],
  providers: [MessageService],
  imports: [ButtonModule,TableModule],
})
export class MisArchivosComponent {
  documentos = [
    {
      nombre: 'Carta de Presentación',
      descripcion: 'Documento que presenta habilidades y experiencia para un empleo.',
      url: '/api/documentos/carta-presentacion.pdf',
      estado: 'Activo',
    },
    {
      nombre: 'Carta de Aceptación',
      descripcion: 'Carta que confirma aceptación de oferta laboral o propuesta.',
      url: '/api/documentos/carta-aceptacion.pdf',
      estado: 'Activo',
    },
    {
      nombre: 'Plan PPP',
      descripcion: 'Documento que guía experiencias laborales para estudiantes en formación.',
      url: '/api/documentos/plan-ppp.pdf',
      estado: 'Above Average',
    },
  ];

  archivoSeleccionado: File | null = null;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  seleccionarArchivo(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.archivoSeleccionado = file;
      this.messageService.add({
        severity: 'info',
        summary: 'Archivo seleccionado',
        detail: `Archivo ${file.name} listo para subir.`,
      });
    }
  }

  subirArchivo(): void {
    if (!this.archivoSeleccionado) {
      return;
    }

    const formData = new FormData();
    formData.append('file', this.archivoSeleccionado);

    this.http.post('/api/documentos/upload', formData).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Subida exitosa',
          detail: 'El archivo fue subido correctamente.',
        });
        this.archivoSeleccionado = null;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error al subir',
          detail: 'Hubo un problema al subir el archivo. Inténtalo nuevamente.',
        });
        console.error(err);
      },
    });
  }

  descargarArchivo(url: string): void {
    window.open(url, '_blank');
  }
}
