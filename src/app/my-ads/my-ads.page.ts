import { Component, OnInit } from '@angular/core';
import { FunctionsService } from '../services/functions/functions.service';
import { Ad } from '../interfaces/interfaces';
import { Storage } from '@ionic/storage-angular';
import { DataService } from '../services/data/data.service';

@Component({
  selector: 'app-my-ads',
  templateUrl: './my-ads.page.html',
  styleUrls: ['./my-ads.page.scss'],
})
export class MyAdsPage implements OnInit {
  filterBy!: string;
  showOptions = false;
  showClose = false;
  ads: Ad[] = [
    {
      carType: 'ميرسيدس',
      tyraz: 'ب دبليو',
      tarqeemType: 'كهرباء',
      model: '2023',
      advertiserName: 'أسامة السيد',
      color: 'أحمر',
      counter: 2023,
      importType: 'جديد',
      price: 210000,
      advertiserId: '',
    },
  ];

  myAds!: Ad[];
  constructor(
    private funcService: FunctionsService,
    private storage: Storage,
    private dataService: DataService
  ) {}
  // ####################################################################
  ngOnInit() {
    // this.ads.push()
  }
  // ####################################################################
  async ionViewWillEnter() {
    await this.getMyAds();
  }
  // ####################################################################
  navigate(page: string, dir: string, path?: string) {
    this.funcService.navigate(page, dir, path);
  }
  // ####################################################################
  setFilter(ev: any) {
    this.filterBy = ev.detail.value;
    console.log(this.filterBy);
  }
  // ####################################################################
  async deleteItem(id: string | undefined) {
    this.funcService.deleteAlert('هل انت متأكد؟', 'تأكيد').then(async (res) => {
      if (res === true) {
        this.dataService.deleteData('/ad/' + id).subscribe(
          async (res) => {
            console.log(res);
            await this.getMyAds();
          },
          (err) => {
            console.log(err);
          }
        );
      } else {
        return;
      }
    });
  }

  async getMyAds() {
    this.myAds = await this.storage.set('myAds', []);
    let myId = '';
    await this.storage.get('user').then((res) => {
      if (!res) {
        return;
      }
      myId = res._id;
    });
    this.dataService.getData('/ad/' + myId).subscribe(
      async (res) => {
        console.log(res);
        this.myAds = res.ads;
      },
      async (err) => {
        console.log(err);
      }
    );
  }
}
