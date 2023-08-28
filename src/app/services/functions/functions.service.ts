import { Injectable } from '@angular/core';
import {
  AlertController,
  LoadingController,
  LoadingOptions,
  NavController,
  ToastController,
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

  // ########################################################################
  // ################## SET NAV FUNCTIONS HERE ##############################
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

  // ########################################################################
  // ################## SET TOASTER(:_) FUNCTIONS HERE ######################
  //  You can make one function to present the toast, make a boolean paramerter
  //  to check if the toast will be error or success using ternary conditional operator
  //  e.g => header: error? "err":"success"
  async ShowErrorToast(message: string, any?: any) {
    let toast = await this.toastCtrl.create({
      message: message || 'Error',
      duration: 2000,
      cssClass: 'error-toast',
      position: 'top',
    });
    await toast.present();
  }

  async ShowSuccessToast(message: string, any?: any) {
    let toast = await this.toastCtrl.create({
      message: message || 'نجاح',
      position: 'top',
      duration: 2000,
      cssClass: 'success-toast',
    });
    await toast.present();
  }

  // ########################################################################
  // ########################################################################
  // Alert Functions
  async deleteAlert(message?: string, header?: string) {
    const alert = await this.alertCtrl.create({
      header: header || 'confirm',
      message: message || 'Are you Sure',
      buttons: [
        { text: 'لا', role: 'cancel' },
        {
          text: 'نعم',
          role: 'confirm',
        },
      ],
      cssClass:'alertStyle'
    });
    await alert.present();
    const data = await alert.onDidDismiss();

    data.role == 'confirm';
    console.log(data.role);
    return data.role == 'confirm';
  }
  // ########################################################################
  // ########################################################################
  // Loading Functions
  async showLoading(message: string = ''): Promise<void> {
    if (this.isLoading) {
      return;
    }
    // this.isLoading = true;
    const options: LoadingOptions = {
      message,
      cssClass: 'Loading-style',
      showBackdrop: true,
      translucent: true,
      animated: true,
      mode: 'ios',
    };
    this.loading = await this.loadCtrl.create(options);
    await this.loading.present();
  }

  async dismissLoading() {
    this.loading?.dismiss();
  }
  // ########################################################################
  // ########################################################################

  // ########################################################################
}
