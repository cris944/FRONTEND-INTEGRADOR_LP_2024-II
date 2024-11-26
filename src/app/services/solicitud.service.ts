import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Solicitud } from '../models/solicitud';   // Importa tu DTO aquí

@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  private apiUrl = 'http://localhost:8080/api/solicitudes'; // URL de la API

  constructor(private http: HttpClient) {}


  obtenerDatosYSolicitudes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`).pipe(
      catchError(this.handleError)
    );
  }

  guardarSolicitud(solicitud: Solicitud): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, solicitud, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }).pipe(
      catchError(this.handleError)
    );
  }


  listarSolicitudes(): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(`${this.apiUrl}/list`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {

      errorMessage = `Error: ${error.error.message}`;
    } else {

      errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}`;
    }
    return throwError(errorMessage);
  }
  obtenerDatosIniciales(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }


}
