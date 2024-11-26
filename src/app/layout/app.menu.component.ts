import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'INICIO',
                items: [
                    { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'UI Components',
                items: [
                    { label: 'Persona', icon: 'pi pi-fw pi-id-card', routerLink: ['personas'] },
                    { label: 'Estudiante', icon: 'pi pi-fw pi-check-square', routerLink: ['estudiantes'] },
                    { label: 'Empresa', icon: 'pi pi-fw pi-bookmark', routerLink: ['empresas'] },
                    { label: 'Solicitud', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['solicitudes'] },
                    { label: 'Mis Archivos', icon: 'pi pi-fw pi-box', routerLink: ['mis-archivos'] },
                ]
            },
        ];
    }
}
