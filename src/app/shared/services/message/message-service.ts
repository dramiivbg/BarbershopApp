import { inject, Injectable } from '@angular/core';
import { AlertController} from '@ionic/angular';
import { TypeMessage } from '../../enums/type-message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  private alertCtrl = inject(AlertController);
  
  public async message(type: TypeMessage, message: string, funcYes:any = () => {}, funcNo:any = () => {}){
    const alert = await this.alertCtrl.create({
      header: type,
      message: message,
      buttons: type.includes("confirm") ? [
        { text: 'No', role: 'cancel', cssClass: 'secondary', handler: () => {
          funcNo();
        }}, 

        {text: 'Si', role: 'confirm', handler: () => {
          funcYes();
        }}
      ] : [{text: 'Ok', handler: () => {
        funcYes();
      }}]
    });

    await alert.present();
  }
}
