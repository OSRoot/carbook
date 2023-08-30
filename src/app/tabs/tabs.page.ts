import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  user:any={}
  homeDarkActive = 0;
  homeLightActive = 1;
  adsDarkActive = 0;
  adLightActive = 1;
  wishesDarkActive = 0;
  wishesLightActive = 1;
  exposDarkActive = 0;
  exposLightActive = 1;
  constructor(
    private navCtrl: NavController,
    private storage:Storage
    ) {}
  // currentActiveTabValue!: string;
  ngOnInit() {
    this.navCtrl.navigateForward('/tabs/home');
    this.homeDarkActive = 1;
    this.homeLightActive = 0;
  }
  setTabValue(tab: string) {
    console.log(`Current active tab value : ${tab}`);
    localStorage.setItem('activeTabValue', tab);
  }

  async ionViewWillEnter() {
    if (!this.user._id) await this.storage.get('user');
  }


  activateTab(tab: string) {
    if (tab === 'home') {
      this.homeDarkActive = 1;
      this.homeLightActive = 0;
      this.adsDarkActive = 0;
      this.adLightActive = 1;
      this.wishesDarkActive = 0;
      this.wishesLightActive = 1;
      this.exposDarkActive = 0;
      this.exposLightActive = 1;
    } else if (tab === 'expos') {
      this.homeDarkActive = 0;
      this.homeLightActive = 1;
      this.adsDarkActive = 0;
      this.adLightActive = 1;
      this.wishesDarkActive = 0;
      this.wishesLightActive = 1;
      this.exposDarkActive = 1;
      this.exposLightActive = 0;
    } else if (tab === 'my-ads') {
      this.homeDarkActive = 0;
      this.homeLightActive = 1;
      this.adsDarkActive = 1;
      this.adLightActive = 0;
      this.wishesDarkActive = 0;
      this.wishesLightActive = 1;
      this.exposDarkActive = 0;
      this.exposLightActive = 1;
    } else if (tab === 'wishes') {
      this.homeDarkActive = 0;
      this.homeLightActive = 1;
      this.adsDarkActive = 0;
      this.adLightActive = 1;
      this.wishesDarkActive = 1;
      this.wishesLightActive = 0;
      this.exposDarkActive = 0;
      this.exposLightActive = 1;
    }
  }

  WhereNow(ev: any) {
    console.log(ev.detail.value);
  }

  NavigateBySegChange(ev: any) {
    this.activateTab(`${ev.target.value}`);
    this.navCtrl.navigateForward(`/tabs/${ev.target.value}`);
  }
}
