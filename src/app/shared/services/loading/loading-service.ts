import { inject, Injectable } from '@angular/core';
import { LoadingController} from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingCtrl = inject(LoadingController);
  
  public async loading(message: string = "loading....."){
    const load = await this.loadingCtrl.create({
      message: message,
      backdropDismiss: false,
      spinner: "circular"
    });

    await load.present();
  }

  public async dismiss(){
    await this.loadingCtrl.dismiss();
  }
}
