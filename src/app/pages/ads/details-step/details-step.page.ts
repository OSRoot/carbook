import { Component, OnInit, Output } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Ad, User } from 'src/app/interfaces/interfaces';
import { FunctionsService } from 'src/app/services/functions/functions.service';

@Component({
  selector: 'app-details-step',
  templateUrl: './details-step.page.html',
  styleUrls: ['./details-step.page.scss'],
})
export class DetailsStepPage implements OnInit {
  @Output() ad: Ad[] = [];
  user: any = {};
  carType: string = '';
  carImportType: string = '';
  carTarqueem: string = '';
  carTyraz: string = '';
  carModel: string = '';
  carColor: string = '';
  carCounter!: number;
  advertiserId!: string;
  advertiserName!: string;
  constructor(
    private funcService: FunctionsService,
    private storage: Storage
  ) {}

  ngOnInit() {}

  async ionViewWillEnter() {
    await this.storage.get('user').then(
      async (user) => {
        console.log(user);
        if (!user) {
          await this.funcService.ShowSuccessToast('الدخول كزائر');
          this.navigate('/welcome', 'root');
          return;
        }
        this.funcService.ShowSuccessToast('إكمال بيانات الإعلان');
        this.user = user;
        this.advertiserName = user.fullname;
      },
      async (err) => {
        console.log('err', err);
      }
    );
  }
  // Basic Functions to set values from user
  navigate(page: string, dir: string, path?: string) {
    this.funcService.navigate(page, dir, path);
  }
  sendit(ev: any) {}
  setImportType(ev: any) {
    this.carImportType = ev.target.value;
  }
  setTarqeem(ev: any) {
    this.carTarqueem = ev.target.value;
  }
  setTyraz(ev: any) {
    this.carTyraz = ev.target.value;
  }
  setColor(ev: any) {
    console.log(ev.target.value);

    this.carColor = ev.target.value;
  }
  setCarType(ev: any) {
    this.carType = ev.target.value;
  }

  setCarModel(ev: any) {
    this.carModel = ev.target.value;
  }

  // Gather all in on
  async setData() {
    if (
      !this.carColor.length ||
      !this.carType.length ||
      !this.carImportType.length ||
      !this.carTyraz.length ||
      !this.carModel.length ||
      !this.carTarqueem.length
    ) {
      this.funcService.ShowErrorToast('يجب ملء جميع البيانات للاستمرار');
      return;
    }
    const myAd: Ad = {
      carType: this.carType,
      tyraz: this.carTyraz,
      color: this.carColor,
      importType: this.carImportType,
      model: this.carModel,
      counter: this.carCounter,
      tarqeemType: this.carTarqueem,
      advertiserId: this.advertiserId,
      advertiserName: this.advertiserName,
    };
    await this.storage.set('myAd', myAd);
    this.navigate('/step3', 'forward');
  }
}
