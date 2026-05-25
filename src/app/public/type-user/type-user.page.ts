import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { 
  IonContent, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardContent, 
  IonIcon 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline, storefrontOutline, arrowForwardOutline } from 'ionicons/icons';


@Component({
  selector: 'app-type-user',
  templateUrl: './type-user.page.html',
  styleUrls: ['./type-user.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonGrid, 
    IonRow, 
    IonCol, 
    IonCard, 
    IonCardHeader, 
    IonCardTitle, 
    IonCardContent, 
    IonIcon
  ]
})
export class TypeUserPage{

  // Inyección de dependencias moderna en Angular
  private router = inject(Router);

  constructor() {
    // Registro obligatorio de íconos en las últimas versiones de Ionic standalone
    addIcons({ personOutline, storefrontOutline, arrowForwardOutline });
  }

  /**
   * Maneja la selección del tipo de usuario
   * @param rol 'usuario' | 'barberia'
   */
  seleccionarRol(rol: 'usuario' | 'barberia') {
    if (rol === 'usuario') {
      // Redirige al flujo de cliente (ej: '/home-cliente' o login)
      this.router.navigate(['/login'], { replaceUrl: true });
    } else {
      // Redirige al flujo de barbería/multi-tenant (ej: '/dashboard-barberia')
      this.router.navigate(['/login-barber'], { replaceUrl: true });
    }
  }

}
