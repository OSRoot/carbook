import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data/data.service';
import { FunctionsService } from 'src/app/services/functions/functions.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user:any={};
  constructor(
    private dataService:DataService,
    private funcService: FunctionsService,
    private authService: AuthService
  ) {}

  ngOnInit() {}
   ionViewWillEnter() {
  this.user = this.dataService.getUser;
  }

  async clearData() {
    this.authService.logOut();
    this.funcService.presentToast('تم تسجيل الخروج بنجاح',false);
  }

  // #############################################################
  // #############################################################

  navigate(page: string, dir: string, path?: string) {
    this.funcService.navigate(page, dir, path);
  }
  // #############################################################
  // #############################################################
}
