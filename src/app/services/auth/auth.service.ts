import { Injectable } from '@angular/core';
import { FunctionsService } from '../functions/functions.service';
import { DataService } from '../data/data.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Observable, from, take } from 'rxjs';

// Storage KEYS
const USER = 'user';
const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // #####################################################################
  constructor(
    private funcService: FunctionsService,
    private dataService: DataService,
    private navCtrl: NavController,
    private storage: Storage
  ) {}
  // #####################################################################
  get accessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN);
  }
  // #####################################################################
  async removeCredentials(): Promise<void> {
    localStorage.removeItem(ACCESS_TOKEN);
    await this.storage.remove(USER);
    await this.storage.remove(REFRESH_TOKEN);
  }
  // #####################################################################
  async saveCredentials(
    user: any,
    accessToken: any,
    refreshToken: any
  ): Promise<void> {
    await this.storage.set(USER, user);
    await this.storage.set(REFRESH_TOKEN, refreshToken);
    localStorage.setItem(ACCESS_TOKEN, accessToken);
  }
  // #####################################################################
  getRefreshToken(): Observable<any> {
    const PROMISE: Promise<string> = new Promise(async (resolve, reject) => {
      const token: string = await this.storage.get(REFRESH_TOKEN);
      this.dataService.getData('/user/refreshToken?token=' + token).subscribe(
        (res: any) => {
          localStorage.setItem(ACCESS_TOKEN, res.accessToken);
          resolve(res.token);
        },
        (err) => reject(err)
      );
    });
    return from(PROMISE);
  }
  // #####################################################################
  async login(body: any) {
    await this.funcService.showLoading();
    this.dataService.postData('/user/login', body).subscribe(
      async (user: any) => {
        await this.saveCredentials(
          user.theUser,
          user.accessToken,
          user.refreshToken);
        await this.funcService.dismissLoading();
        this.dataService.setUser(user.theUser)
        this.navCtrl.navigateForward('/tabs/home');
      },
        (err) => {
          this.funcService.dismissLoading();
          if (err.status === 400 ||err.status === 401) {
          return  this.funcService.presentToast(
            'خطأ برقم الهاتف او كلمة المرور'
          );
        }
        if (err.status == 403) {
          return this.funcService.presentToast(
            'Your account is suspended call SuperMan'
          );
        }
        return this.funcService.presentToast('Network Error');
      }
    );
  }
  // #####################################################################
  async logOut(): Promise<void> {
    await this.funcService.showLoading();
    await this.removeCredentials();
    await this.funcService.dismissLoading();
    this.navCtrl.navigateRoot('/welcome');
  }
  // #####################################################################
  async signup(form: any) {
    await this.funcService.showLoading();
    this.dataService.postData('/user/register', form).subscribe(
      async (user: any) => {
        await this.saveCredentials(
          user[0].theUser,
          user[0].accessToken,
          user[0].refreshToken)
        this.funcService.dismissLoading();
        this.dataService.setUser(user.theUser)
        this.navCtrl.navigateForward('/tabs/home');
      },
      async (err) => {
        await this.funcService.dismissLoading();
        console.log(err.status);
        if (err.status === 400) {
          return await this.funcService.presentToast(err.error.error);
        }
        if (err.status === 404) {
          return await this.funcService.presentToast(err.error.error);
        }
        if (err.status === 409) {
          return await this.funcService.presentToast(err.error.error);
        } else if (err.status == 403) {
          return await this.funcService.presentToast(
            'Your account is suspended call SuperMan'
          );
        }
        console.log(err);
        return await this.funcService.presentToast('خطأ في الإتصال');
      }
    );
  }
}
