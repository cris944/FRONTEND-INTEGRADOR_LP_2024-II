import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth'; // URL base del backend
  private readonly tokenKey = 'auth_token'; // Clave para almacenar el token en localStorage

  constructor(private http: HttpClient) {}

  /**
   * Inicia sesión enviando las credenciales al backend.
   * @param username Nombre de usuario.
   * @param password Contraseña.
   * @returns Observable que emite la respuesta del backend.
   */

  login(username: string, password: string, rememberMe: boolean): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(response => {
        this.saveToken(response.token, rememberMe);  // Guardar el token según la opción de "Recuérdame"
      })
    );
  }
  /**
   * Almacena el token JWT en el almacenamiento local.
   * @param token Token JWT recibido del backend.
   */
  storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  /**
   * Obtiene el token JWT almacenado en el localStorage.
   * @returns El token JWT si existe, de lo contrario, null.
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Elimina el token JWT del almacenamiento local.
   */
  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  /**
   * Genera encabezados HTTP con el token JWT para solicitudes autenticadas.
   * @returns HttpHeaders configurados con el token JWT.
   */
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token found. User might not be authenticated.');
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getUserInfo(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>('http://localhost:8080/api/auth/user-info', { headers });
}

  /**
   * Realiza el cierre de sesión eliminando el token del almacenamiento local.
   */
  logout(): void {
    this.clearToken();
  }

  /**
   * Verifica si el usuario está autenticado.
   * @returns True si existe un token en el localStorage, de lo contrario, false.
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  saveToken(token: string, rememberMe: boolean): void {
    if (rememberMe) {
      localStorage.setItem('jwtToken', token);  
    } else {
      sessionStorage.setItem('jwtToken', token); 
    }
  }

  
  
}
