import { Component, ViewChild } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Estudiante } from '../../../models/estudiante';
import { Persona } from '../../../models/persona';
import { EstudianteService } from '../../../services/estudiante.service';
import { PersonaService } from '../../../services/persona.service';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ExcelService } from '../../../services/excel.service';

@Component({
  selector: 'app-estudiante',
  standalone: true,
  imports: [
    ButtonModule,ToastModule,ToolbarModule,FileUploadModule,TableModule, ButtonModule, DialogModule, RouterModule, InputTextModule,
    FormsModule, ConfirmDialogModule,SplitButtonModule,MatButtonModule,MatMenuModule,MatIconModule
  ],
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css'],
})
export class EstudianteComponent {
  estudiantes: Estudiante[] = [];
  personas: Persona[] = [];
  deleteEstudianteDialog: boolean = false;
  visible: boolean = false;
  selectedEstudiantes: Estudiante[] = [];
  deletePersonasDialog: boolean = false;
  @ViewChild('dt') dt: any;
  @ViewChild('fileInput') fileInput!: any;
  menuItems: MenuItem[] = [];
  items: MenuItem[] = [];
  estudiante: Estudiante = new Estudiante();
  persona: Persona = new Persona();
  titulo: string = '';
  opc: string = '';
  op = 0;
  selectedFile: File | null = null;

  constructor(
    private estudianteService: EstudianteService,
    private excelService: ExcelService,
    private personaService: PersonaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.listarEstudiantes();
    this.menuItems = [
      {
        label: 'Importar',
        icon: 'pi pi-file-import',
        command: () => this.showFileUploadDialog(),
      },
      {
        label: 'Exportar',
        icon: 'pi pi-upload',
        command: () => this.exportData(),
      },
    ];
  }

  ////////////////////////////////////////////////////////////////
  //**IMPORTAR**//
  ///////////////
  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  showFileUploadDialog() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.xlsx';

    fileInput.addEventListener('change', (event: any) => {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file; // Guarda el archivo en la propiedad
        this.uploadFile();       // Llama a uploadFile sin argumentos
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'No se seleccionó ningún archivo.' });
      }
    });

    fileInput.click();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadFile(): void {
    if (!this.selectedFile) {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor, selecciona un archivo' });
      return;
    }

    this.excelService.uploadExcel(this.selectedFile).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Archivo importado correctamente' });
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
      }
    });
  }

  ///////////////////////////////////////////////////////////////

  listarEstudiantes() {
    this.estudianteService.getEstudiantes().subscribe(
      (data) => {
        this.estudiantes = data;
        console.log(this.estudiantes);
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error al cargar estudiantes',
          detail: error.message || 'Error al cargar los estudiantes',
        });
      }
    );
  }

  listarPersonas() {
    this.personaService.getPersonas().subscribe(
      (data) => {
        this.personas = data;
        console.log(this.personas);
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error al cargar personas',
          detail: error.message || 'Error al cargar las personas',
        });
      }
    );
  }

  showDialogCreate() {
    this.prepareDialog('Crear Estudiante', 'Guardar', 0);
  }

  showDialogEdit(id: number) {
    this.titulo = 'Editar Estudiante';
    this.opc = 'Actualizar';

    this.estudianteService.getEstudianteById(id).subscribe({
      next: (data) => {
        this.estudiante = { ...data };
        this.persona = { ...this.estudiante.persona };
        this.visible = true;
      },
      error: (error) => this.handleError(error, 'Error al cargar el estudiante'),
    });
  }

  deleteSelectedPersonas(): void {
    this.deletePersonasDialog = true;
  }

  prepareDialog(title: string, buttonText: string, opValue: number) {
    this.titulo = title;
    this.opc = buttonText;
    this.op = opValue;
    this.estudiante = new Estudiante();
    this.persona = new Persona();
    this.visible = true;
  }

  opcion() {
    if (this.op === 0) {
      this.addPersonaAndEstudiante();
    } else if (this.op === 1) {
      this.updatePersonaAndEstudiante();
    }
  }

  showDialogDelete(id: number): void {
    this.estudianteService.getEstudianteById(id).subscribe({
      next: (data) => {
        this.estudiante = { ...data };
        this.persona = { ...this.estudiante.persona };
        this.deleteEstudianteDialog = true;
      },
      error: (error) => this.handleError(error, 'Error al cargar el estudiante'),
    });
  }

  deleteSelectedEstudiantes(): void {
    this.deletePersonasDialog = true;
  }

  confirmDeleteSelected(): void {
    const idsToDelete = this.selectedEstudiantes.map(
      (estudiante) => estudiante.id
    );

    this.estudianteService.deleteEstudiantesBatch(idsToDelete).subscribe({
      next: (response) => {
        console.log('Respuesta del backend:', response);
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: response.message || 'Estudiantes eliminados exitosamente.',
        });
        this.listarEstudiantes();
        this.selectedEstudiantes = [];
        this.deleteEstudianteDialog = false;
      },
      error: (error) => {
        console.error('Error al eliminar estudiantes:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail:
            error.error?.details ||
            'No se pudieron eliminar los estudiantes. Revisa los detalles del error.',
        });
      },
    });
  }

  deleteEstudiante(id: number) {
    this.estudianteService.deleteEstudiante(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Estudiante Eliminado',
        });
        this.listarEstudiantes();
      },
      error: (error) =>
        this.handleError(error, 'No se pudo eliminar el estudiante'),
    });
  }

  addPersonaAndEstudiante() {
    if (this.isValid()) {
      this.personaService.createPersona(this.persona).subscribe({
        next: (persona) => {
          this.estudiante.persona = persona;
          this.createEstudiante();
        },
        error: (error) => this.handleError(error, 'No se pudo agregar la persona'),
      });
    }
  }

  updatePersonaAndEstudiante() {
    if (this.isValid()) {
      this.personaService.updatePersona(this.persona, this.persona.id).subscribe({
        next: (updatedPersona) => {
          this.estudiante.persona = updatedPersona;
          this.updateEstudiante();
        },
        error: (error) =>
          this.handleError(error, 'No se pudo actualizar la persona'),
      });
    }
  }

  createEstudiante() {
    this.estudianteService.createEstudiante(this.estudiante).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Estudiante Registrado',
        });
        this.listarEstudiantes();
        this.closeDialog();
      },
      error: (error) =>
        this.handleError(error, 'No se pudo agregar el estudiante'),
    });
  }

  updateEstudiante() {
    this.estudianteService.updateEstudiante(this.estudiante).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Estudiante Actualizado',
        });
        this.listarEstudiantes();
        this.closeDialog();
      },
      error: (error) =>
        this.handleError(error, 'No se pudo actualizar el estudiante'),
    });
  }

  isValid(): boolean {
    if (
      !this.persona.nombre ||
      !this.persona.apellido ||
      !this.persona.dni ||
      !this.persona.correo ||
      !this.persona.telefono ||
      !this.persona.pais || // Validación del campo nuevo
      !this.persona.religion || // Validación del campo nuevo
      !this.persona.estado ||
      !this.estudiante.codigo ||
      !this.estudiante.ciclo || // Validación para nuevo campo
      !this.estudiante.grupo || // Validación para nuevo campo
      !this.estudiante.correo_institucional // Validación para nuevo campo
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Todos los campos son obligatorios',
      });
      return false;
    }
    return true;
  }

  closeDialog() {
    this.visible = false;
    this.estudiante = new Estudiante();
    this.persona = new Persona();
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  handleError(error: any, defaultMessage: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: error.message || defaultMessage,
    });
  }

  exportData() {
    if (this.dt) {
      this.dt.exportCSV();
    } else {
      console.error('La referencia a la tabla no está definida.');
    }
  }
  onSelectionChange(): void {
    this.cdr.detectChanges();
  }
  confirmDelete(estudiante: Estudiante): void {
    if (!estudiante || !estudiante.id) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo encontrar el estudiante para eliminar.',
      });
      return;
    }
  }
  limpiar() {
    this.titulo = '';
    this.opc = '';
    this.op = 0;
    this.estudiante = new Estudiante();
    this.visible = false;
  }
}
