import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Linea } from '../models/linea';  // Asegúrate de tener el modelo de 'Linea'

@Injectable({
  providedIn: 'root'
})
export class LineaService {
  
  private apiUrl = 'http://localhost:8080/api/lineas';  // URL del API para 'linea'

  constructor(private http: HttpClient) {}

  // Obtener todas las líneas
  getLineas(): Observable<Linea[]> {
    return this.http.get<Linea[]>(this.apiUrl);
  }

  // Obtener una línea por ID
  getLineaById(id: number): Observable<Linea> {
    return this.http.get<Linea>(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva línea
  createLinea(linea: Linea): Observable<Linea> {
    return this.http.post<Linea>(this.apiUrl, linea);
  }

  // Actualizar una línea existente
  updateLinea(linea: Linea, id: number): Observable<Linea> {
    return this.http.put<Linea>(`${this.apiUrl}/${id}`, linea);
  }

  // Eliminar una línea por ID
  deleteLinea(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Eliminar múltiples líneas en batch
  deleteLineasBatch(ids: number[]): Observable<any> {
    return this.http.request('DELETE', `${this.apiUrl}/batch`, {
      body: ids,
    });
  }
}
