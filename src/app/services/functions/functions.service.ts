import { Injectable } from '@angular/core';
import {AlertController, AlertOptions, LoadingController, LoadingOptions, NavController, ToastController,
} from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class FunctionsService {
  private isLoading: boolean = false;
  private loading: any | null;
  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private loadCtrl: LoadingController
  ) {}

  navigate(page: string, dir: string, path?: string) {
    if (dir === 'back') {
      this.navCtrl.navigateBack(page);
    }
    if (dir === 'forward') {
      this.navCtrl.navigateForward(page);
    }
    if (dir === 'root') {
      this.navCtrl.navigateRoot(page);
    }
    if (path) {
      this.navCtrl.navigateForward(`${page}/${path}`);
    } else {
      return;
    }
  }


// Show Loading functions
async showLoading(message:string =''):Promise<void>{
  if(this.isLoading) return;
  this.isLoading =true;
  const options:LoadingOptions= {
    message,
    cssClass:'custom_loading',
    showBackdrop:true,
    translucent:true,
    animated:true,
    mode:'md'
  }
  this.loading = await this.loadCtrl.create(options);
  await this.loading.present();
}

// Dismiss loading function
async dismissLoading():Promise<void>{
    await this.loading?.dismiss();
}


  async presentToast(message: string,error:boolean=true) {
    let toast = await this.toastCtrl.create({
      header:error ? 'خطأ':'تم',
      message,
      mode:'md',
      duration: 2500,
      cssClass: error? 'error-toast':'toast-success',
      position: 'top',
      buttons:[
        {
          icon:'close',
          role:'cancel'
        }
      ]
    });
    await toast.present();
  }
  // Alert Functions
  async confirmAlert(alertData:AlertOptions):Promise<boolean>{
    const alert = await this.alertCtrl.create({
      header:alertData?.header||'تـأكيد الحذف',
      message:alertData?.message ||'هل أنت متأكد من الحذف؟',
      mode:'ios',
      buttons:[
        {
          text:'موافق',
          role:'confirm'
        },
        {
          text:'إلغاء',
          role:'cancel'
        }
      ]
    });
    await alert.present();
    const data = await alert.onDidDismiss();
    return data.role=='confirm';
  }
  
  // ####################################################################
  //            KIMO
  numberToString(value: string | number): string {
    const number = this.stringToNumber(value)
    const formattedValue = new Intl.NumberFormat().format(number);
    return formattedValue || ""
  }

  stringToNumber(value: string | number): number {
    if (typeof value == 'number') return value;
    return parseFloat(value?.replace(/,/g, '')) || 0;
  }

  async initSettings(): Promise<void> {
    
    // this.settings = await this.storage.get("setting") || this.settings;
  } 
  // ########################################################################
}
