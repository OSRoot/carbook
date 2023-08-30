import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FunctionsService } from 'src/app/services/functions/functions.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  constructor(
    private storage: Storage,
    private funcService: FunctionsService,
    private authService: AuthService
  ) {}

  ngOnInit() {}
  async ionViewWillEnter() {
    await this.storage.get('refreshToken').then((token) => {
      if (token) {
        return;
      }
      this.funcService.navigate('/welcome', 'root');
    });
  }
  async clearData() {
    this.authService.logOut();
    this.funcService.presentToast('تم تسجيل الخروج بنجاح');
    this.funcService.navigate('/welcome', 'forward');
  }

  // #############################################################
  // #############################################################

  navigate(page: string, dir: string, path?: string) {
    this.funcService.navigate(page, dir, path);
  }
  // #############################################################
  // #############################################################
}
