// solicitud.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EmpresaDto {
  id: number;
  razonSocial: string;
  direccion: string;
}

export interface LineaDto {
  id: number;
  nombre: string;
}

export interface SolicitudDto {
  id: number;
  estado: string;
  fechaCreacion: string;
  estudiante: any;
  empresa: EmpresaDto;
  linea: LineaDto;
}

@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  private apiUrl = 'http://localhost:8080/api/solicitudes';
  constructor(private http: HttpClient) {}

  // Crear solicitud
  createSolicitud(solicitud: SolicitudDto): Observable<SolicitudDto> {
    return this.http.post<SolicitudDto>(this.apiUrl, solicitud);
  }
}
