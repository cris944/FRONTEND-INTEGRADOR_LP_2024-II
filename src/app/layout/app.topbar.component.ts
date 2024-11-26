import { Component, ElementRef, ViewChild,HostListener } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent {
    menuItems: MenuItem[] = []; // Opciones del menú
    isEditingProfile: boolean = false; // Controla si se está editando el perfil
    isProfileMenuOpen: boolean = false;
    roleMap: { [key: string]: string } = {
        'ROLE_ADMIN': 'Administrador',
        'ROLE_USER': 'Usuario',
        'ROLE_STUDENT': 'Estudiante',
        'ROLE_SUPERVISOR_ACADEMICO':'Supervisor Académico',
        'ROLE_COORDINADOR':'Coordinador',
        'ROLE_SECRETARIA':'Secretaria'
  };
    

    @ViewChild('menubutton') menuButton!: ElementRef;
    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
    @ViewChild('topbarmenu') menu!: ElementRef;
    @ViewChild('menu') menuuser!: ElementRef;
    userInfo: any = {};
    errorMessage: string = '';

    constructor(public layoutService: LayoutService,private eRef: ElementRef,private authService: AuthService,private router: Router) {
        this.menuItems = [
            { label: 'Ver Perfil', icon: 'pi pi-user', command: () => this.goToProfile() },
            { label: 'Cerrar Sesión', icon: 'pi pi-power-off', command: () => this.logout() },
        ];
    }
    ngOnInit(): void {
        this.loadUserInfo();
      }

    goToProfile() {
        this.isEditingProfile = true;
        console.log('Editar perfil activado');
    }


    logout(): void {
        this.authService.logout(); 
        this.router.navigate(['/login']); 
      }

    loadUserInfo(): void {
    this.authService.getUserInfo().subscribe(
        (data) => {
            console.log(data);
            this.userInfo = data; 
            this.userInfo.roles = this.userInfo.roles.map((role: string) => this.roleMap[role] || role);
        },
        (error) => {
            console.error(error);
            this.errorMessage = 'Error al cargar la información del usuario.';
        }
    );
}
    toggleProfileMenu() {
        this.isProfileMenuOpen = !this.isProfileMenuOpen;
      }
    
      editProfile() {
        console.log('Editar Perfil');
    
      }
      @HostListener('document:click', ['$event'])
    onDocumentClick(event: Event): void {

        if (!this.eRef.nativeElement.contains(event.target)) {
            this.isProfileMenuOpen = false;
        }
    }
    closeProfileMenu() {
        this.isProfileMenuOpen = false;
    }
    
}
