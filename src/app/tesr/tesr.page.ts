import { Component, OnInit } from '@angular/core';
import { RangeCustomEvent } from '@ionic/angular';
import { RangeValue } from '@ionic/core';
import { FunctionsService } from '../services/functions/functions.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tesr',
  templateUrl: './tesr.page.html',
  styleUrls: ['./tesr.page.scss'],
})
export class TesrPage implements OnInit {
  images: any[] = [];
  pinFormatter(value: number) {
    return `${value}%`;
  }
  onIonChange(ev: Event) {
    console.log(
      'ionChange emitted value:',
      (ev as RangeCustomEvent).detail.value
    );
  }
  constructor(private fService: FunctionsService, private storage: Storage) {}

  async ngOnInit() {
    await this.storage.get('IMAGES').then((imgs) => {
      this.images = imgs;
    });
  }
}
