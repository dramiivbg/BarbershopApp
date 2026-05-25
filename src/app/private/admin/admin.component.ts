import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp,  logOutSharp, listSharp } from 'ionicons/icons';
import { AuthService } from 'src/app/shared/services/auth/auth-service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  imports: [RouterLink, RouterLinkActive, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet],
})
export class AdminComponent implements OnInit{
  public appPages = [
    { title: 'Crear Servicios', url: '/private/home', icon: 'list', action: () => { } },
    { title: 'Logout', url: '/login-barber', icon: 'log-out', action: () => this.logout() }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  public email = signal('');
  public name = signal('');
  private authService = inject(AuthService);
  constructor() {
    addIcons({ logOutSharp, listSharp });
   }

  async ngOnInit() {
    const token:string = await this.authService.getToken();

    const decodedToken: any = this.authService.decodeToken(token);
    
    // URL del Claim de Rol estándar que genera tu API de .NET
    const emailClaimKey = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress';
    this.email.set(decodedToken[emailClaimKey]);
    const nameClaimKey = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name';
    this.name.set(decodedToken[nameClaimKey]);
  }


    async logout(){
    debugger
    await this.authService.logout();
  }

}
