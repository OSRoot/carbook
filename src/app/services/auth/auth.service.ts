import { Injectable } from '@angular/core';
import { FunctionsService } from '../functions/functions.service';
import { DataService } from '../data/data.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Observable, take } from 'rxjs';

const USER = 'user';
const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private funcService: FunctionsService,
    private dataService: DataService,
    private navCtrl: NavController,
    private storage: Storage
  ) {}
  // #####################################################################
  // #####################################################################

  get accessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN);
  }
  // #####################################################################
  // #####################################################################

  async removeCredentials(): Promise<void> {
    localStorage.removeItem(ACCESS_TOKEN);
    await this.storage.remove(USER);
    await this.storage.remove(REFRESH_TOKEN);
  }
  // #####################################################################
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
  // #####################################################################
  async getRefreshToken() {
    const token = await this.storage.get(REFRESH_TOKEN);
    this.getToken(token).subscribe(
      (res) => {
        localStorage.setItem(ACCESS_TOKEN, res.accessToken);
      },
      (err) => {
        console.log(err);
        this.funcService.ShowErrorToast(err);
      }
    );
  }
  getToken(token: any): Observable<any> {
    return this.dataService
      .getData('/user/refreshToken?token=' + token)
      .pipe(take(1));
  }
  // #####################################################################
  // #####################################################################

  async login(form: any) {
    await this.funcService.showLoading();
    this.dataService.postData('/user/login', form).subscribe(
      async (user: any) => {
        await this.saveCredentials(
          user.theUser,
          user.accessToken,
          user.refreshToken
        );
        console.log('At this Point data should be saved');

        await this.funcService.dismissLoading();
        this.navCtrl.navigateForward('/tabs/home');
      },
      async (err) => {
        await this.funcService.dismissLoading();
        console.log(err.status);
        if (err.status === 400) {
          // console.log(err.error.error);
          const SERVER_ERROR_MESSAGE = err.error.error;
          return await this.funcService.ShowErrorToast(
            'خطأ برقم الهاتف او كلمة المرور'
          );
        }
        if (err.status === 401) {
          // console.log(err.error.error);
          const SERVER_ERROR_MESSAGE = err.error.error;
          return await this.funcService.ShowErrorToast(
            'خطأ برقم الهاتف او كلمة المرور'
          );
        }
        if (err.status === 404) {
          return await this.funcService.ShowErrorToast('حدث خطأ ما');
        } else if (err.status == 403) {
          return await this.funcService.ShowErrorToast(
            'Your account is suspended call SuperMan'
          );
        }
        console.log(err);
        return await this.funcService.ShowErrorToast('Network Error');
      }
    );
  }
  // #####################################################################
  // #####################################################################

  async logOut(): Promise<void> {
    await this.funcService.showLoading();
    await this.removeCredentials();
    await this.funcService.dismissLoading();
    this.navCtrl.navigateRoot('/welcome');
  }

  // #####################################################################
  // #####################################################################

  async userLogin(form: any) {
    await this.funcService.showLoading();
    this.dataService.postData('/user/login', form).subscribe(
      async (user) => {
        await this.saveCredentials(
          user.theUser,
          user.accessToken,
          user.refreshToken
        );
        await this.funcService.dismissLoading();
        this.navCtrl.navigateForward('/tabs/home');
      },
      async (err) => {
        await this.funcService.dismissLoading();
        await this.funcService.ShowErrorToast(err.error);
      }
    );
  }

  // #####################################################################
  // #####################################################################
  async signup(form: any) {
    console.log(form);

    await this.funcService.showLoading();
    // response comes with an array of 2 items // one is user,and token the 2nd with the status
    this.dataService.postData('/user/register', form).subscribe(
      async (user: any) => {
        await this.storage.set(USER, user[0].theUser);
        await this.storage.set(REFRESH_TOKEN, user[0].refreshToken);
        localStorage.setItem(ACCESS_TOKEN, user[0].accessToken);
        this.funcService.dismissLoading();
        this.navCtrl.navigateForward('/tabs/home');
      },
      async (err) => {
        await this.funcService.dismissLoading();
        console.log(err.status);
        const SERVER_ERROR_MESSAGE = err.error.error;
        if (err.status === 400) {
          // console.log(err.error.error);
          console.log(SERVER_ERROR_MESSAGE);

          return await this.funcService.ShowErrorToast(SERVER_ERROR_MESSAGE);
        }
        if (err.status === 404) {
          console.log(err);
          return await this.funcService.ShowErrorToast('حدث خطأ ما');
        }
        if (err.status === 409) {
          console.log(err);
          return await this.funcService.ShowErrorToast(SERVER_ERROR_MESSAGE);
        } else if (err.status == 403) {
          return await this.funcService.ShowErrorToast(
            'Your account is suspended call SuperMan'
          );
        }
        console.log(err);
        return await this.funcService.ShowErrorToast('Network Error');
      }
    );
  }
}
