import { inject, Injectable } from '@angular/core';
import { StorageService } from '../storage/storageService';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth-service';
import { Barbershop } from '../../models/barbershop';
import { Response } from '../../models/response';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class BarbershopService {
  private http = inject(HttpClient);
  private jwtHelper = new JwtHelperService();
  private storageService = inject(StorageService);
  private authService = inject(AuthService);


  public create(barbershop: Barbershop, token: string):Observable<Response<Barbershop>> {
    return this.http.post<Response<Barbershop>>(`${environment.url}/barbershop/create`, barbershop, {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })});
  }


}
