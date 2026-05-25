
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {  logOutSharp, listSharp } from 'ionicons/icons';
import { AuthService } from 'src/app/shared/services/auth/auth-service';
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
    imports: [RouterLink, RouterLinkActive, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet],
})
export class ClientComponent{
    public appPages = [
      { title: 'Barberias',  url: '/private/home', icon: 'list', action: () => {}},
      { title: 'Logout', url: '/login', icon: 'log-out', action: () => this.logout()}
    ];
    public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
    private authService = inject(AuthService);
  constructor() { 
    addIcons({ logOutSharp, listSharp });
  }

  async logout(){
    debugger
    await this.authService.logout();
  }

}
