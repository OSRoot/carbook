import { Component, OnInit } from '@angular/core';
import { FunctionsService } from '../services/functions/functions.service';
import { Storage } from '@ionic/storage-angular';
import { DataService } from '../services/data/data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  user:any={}
  constructor(
    private funcService: FunctionsService,
    private dataService:DataService
  ) {}
  ngOnInit() {
    setTimeout(async () => {
      await this.funcService.dismissLoading();
    }, 1000);
  }

  async ionViewWillEnter() {
    this.user = await this.dataService.getUser();
    if (this.user?._id) this.funcService.navigate('/tabs/home', 'back');
  }
  // ############################################################
  // ############################################################
  navigate(page: string, dir: string, path?: string) {
    this.funcService.navigate(page, dir, path);
  }

}
