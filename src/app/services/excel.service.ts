import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  private apiUrl = 'http://localhost:8080/api/excel/upload';

  constructor(private http: HttpClient) { }

  uploadExcel(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(this.apiUrl, formData)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
    
      console.error('Error del cliente:', error.error.message);
    } else {
    
      console.error(`Backend code ${error.status}, body: `, error.error);
    }
    return throwError(() => new Error('Ocurrió un error al subir el archivo. Intenta nuevamente.'));
  }
}
