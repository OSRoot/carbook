import { Component, OnInit } from '@angular/core';
import { FunctionsService } from '../services/functions/functions.service';
import { Storage } from '@ionic/storage-angular';
import { Ad, User } from '../interfaces/interfaces';
import { DataService } from '../services/data/data.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  user: User = {};
  AllAdds: Ad[] = [];
  ads: Ad[] = [
    {
      advertiserName: 'Name Name',
      carType: 'CarType',
      color: 'Red',
      counter: 0,
      tarqeemType: 'Tarqueem',
      tyraz: 'Tyraz',
      model: '2000',
      importType: 'New',
    },
  ];

  // #############################################################
  // #############################################################
  constructor(
    private funcService: FunctionsService,
    private storage: Storage,
    private dataService: DataService,
    private authService: AuthService
  ) {}
  // #############################################################
  // #############################################################
  async ngOnInit(): Promise<void> {
    // this.getAllAds();
  }
  // #############################################################
  // #############################################################
  async ionViewWillEnter() {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      this.authService.removeCredentials();
    }
    await this.getAllAds();
    await this.storage.get('user').then(
      async (user) => {
        console.log(user);
        if (!user) {
          await this.funcService.ShowSuccessToast('الدخول كزائر');
          return;
        }
        this.funcService.ShowSuccessToast(`تم التسجيل ك ${user.fullname}`);
        this.user = user;
      },
      async (err) => {
        console.log('err', err);
      }
    );
  }
  // #############################################################
  // #############################################################

  navigate(page: string, dir: string, path?: string) {
    this.funcService.navigate(page, dir, path);
  }
  // #############################################################
  // #############################################################

  // #############################################################
  // #############################################################
  // async loadData(ev: any) {
  //   // document.location.reload();
  //   setTimeout(async () => {
  //     ev.target.complete();
  //     this.funcService.dismissLoading();
  //     this.funcService.ShowSuccessToast('لا توجد اعلانات بعد');
  //   }, 2000);
  //   await this.funcService.showLoading();
  // }

  // #############################################################
  // #############################################################
  async getAllAds() {
    this.AllAdds = await this.storage.set('AllAds', []);
    this.dataService.getData('/ads').subscribe(
      async (res) => {
        this.AllAdds = res;
      },
      async (err) => {
        console.log(err);
      }
    );
  }
  // #############################################################
}
