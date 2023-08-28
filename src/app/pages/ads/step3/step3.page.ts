import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';
import { Ad } from 'src/app/interfaces/interfaces';
import { DataService } from 'src/app/services/data/data.service';
import { FunctionsService } from 'src/app/services/functions/functions.service';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.page.html',
  styleUrls: ['./step3.page.scss'],
})
export class Step3Page implements OnInit {
  progress = 1;
  myAd: any;
  myAds!: any;

  constructor(
    private funcService: FunctionsService,
    private dataService: DataService,
    private storage: Storage
  ) {}
  form!: FormGroup;
  data!: Ad;
  price!: number;
  phoneNumber!: string;
  userId!: string;
  userName!: string;
  async ngOnInit() {
    this.form = new FormGroup({
      phone: new FormControl(this.phoneNumber, Validators.required),
      price: new FormControl('', Validators.required),
    });
    const phone = await this.storage.get('user').then((user) => {
      this.userId = user._id;
      this.userName = user.fullname;
      return user.phone;
    });
    if (phone) {
      this.phoneNumber = phone;
    } else {
      const acctoken = localStorage.getItem('accessToken');
      const user = await this.storage.get('refreshToken');
      if (!acctoken || user) {
        localStorage.clear;
        this.storage.clear();
        this.navigate('/welcome', 'root');
      }
    }
  }

  // #######################################################
  navigate(page: string, dir: string, path?: string) {
    this.funcService.navigate(page, dir, path);
  }
  // #######################################################

  async prepareAdData() {}
  // #######################################################
  async postAd() {
    await this.storage.get('myAd').then((ad) => {
      const Myad = {
        advertiserId: this.userId,
        advertiserName: this.userName,
        carType: ad.carType,
        tyraz: ad.tyraz,
        tarqeemType: ad.tarqeemType,
        model: ad.model,
        importType: ad.importType,
        color: ad.color,
        price: this.price,
      };
      this.myAd = Myad;
    });
    console.log(this.price);

    console.log(this.myAd);

    this.dataService.postData('/ad/create', this.myAd).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
    this.navigate('tabs/home', 'forward');
  }
}
