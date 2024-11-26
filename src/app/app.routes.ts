import { Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { HomeComponent } from './components/home/home.component';
import { PersonaComponent } from './components/Mantener-CRUD/persona/persona.component';
import { EmpresaComponent } from './components/Mantener-CRUD/empresa/empresa.component';
import { EstudianteComponent } from './components/Mantener-CRUD/estudiante/estudiante.component';
import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { MisArchivosComponent } from './components/mis-archivos/mis-archivos.component';
import { LoginComponent } from './auth/login/login.component';  // Componente de login
import { AuthGuard } from './services/auth-guard';

export const routes: Routes = [  // Aquí se asegura que routes esté exportado
  {
    path: '',
    component: AppLayoutComponent,  // Layout para las rutas protegidas
    children: [
      { path: '', component: HomeComponent, canActivate: [AuthGuard] }, // Ruta principal protegida
      { path: 'personas', component: PersonaComponent, canActivate: [AuthGuard] }, // Protegida
      { path: 'empresas', component: EmpresaComponent, canActivate: [AuthGuard] }, // Protegida
      { path: 'estudiantes', component: EstudianteComponent, canActivate: [AuthGuard] }, // Protegida
      { path: 'solicitudes', component: SolicitudComponent, canActivate: [AuthGuard] }, // Protegida
      { path: 'mis-archivos', component: MisArchivosComponent, canActivate: [AuthGuard] }, // Protegida
    ]
  },
  {
    path: 'login', 
    component: LoginComponent,  // Ruta de login
  },
  {
    path: '**',  // Ruta para páginas no encontradas
    redirectTo: '',  // Redirigir a la ruta principal
  }
];
