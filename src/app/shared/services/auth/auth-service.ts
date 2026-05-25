import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../../models/user';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Response } from '../../models/response';
import { Login } from '../../models/login';
import { Session } from '../../models/session';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService } from '../storage/storageService';
import { APP_CONSTANTS } from 'src/app/core/constants/app.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient);
  private jwtHelper = new JwtHelperService();
  private storageService = inject(StorageService);

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Aquí podrías añadir un Api-Key si tu backend lo requiere
    })
  };


  public register(user: User):Observable<Response<User>> {
    return this.http.post<Response<User>>(`${environment.url}/user/register`, user, this.httpOptions);
  }

  public Login(login: Login):Observable<Response<Session>>{
    return this.http.post<Response<Session>>(`${environment.url}/user/login`, login, this.httpOptions);
  }


  // Verificar si el usuario está autenticado y el token es válido
  async isLoggedIn(): Promise<boolean> {
    const token = await this.storageService.get(APP_CONSTANTS.STORAGE_KEYS.USER_TOKEN);
        console.log(APP_CONSTANTS.STORAGE_KEYS.USER_TOKEN, token)

    if (!token) {
      return false; // No hay token
    }

    // jwtHelper.isTokenExpired devuelve 'true' si ya expiró o si el formato es inválido
    const isExpired = this.jwtHelper.isTokenExpired(token);
    
    return !isExpired; 
  }

  // Opcional: Obtener la fecha exacta de expiración si la necesitas
  async getTokenExpirationDate(): Promise<Date | null> {
    const token = await this.storageService.get(APP_CONSTANTS.STORAGE_KEYS.USER_TOKEN);
    return token ? this.jwtHelper.getTokenExpirationDate(token) : null;
  }

  async getToken(){
    return await this.storageService.get(APP_CONSTANTS.STORAGE_KEYS.USER_TOKEN);
  }

  // Método nativo para decodificar el payload del JWT
  decodeToken(token: string): any {
    try {
      // 1. Separar las tres partes del token y tomar la del medio (índice 1)
      const payloadBase64 = token.split('.')[1];
      
      // 2. Reemplazar caracteres especiales del formato Base64URL al Base64 estándar
      const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
      
      // 3. Decodificar la cadena Base64 manejando caracteres UTF-8 de forma segura
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      // 4. Retornar el objeto JSON listo
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decodificando el token JWT:', error);
      return null;
    }
  }

  async logout(){
    await this.storageService.remove(APP_CONSTANTS.STORAGE_KEYS.USER_TOKEN);
  }


  
}
