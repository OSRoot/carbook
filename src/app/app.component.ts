import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isLoaded = 0;
  constructor(private storage: Storage) {
    this.init();
    setTimeout(() => {
      this.isLoaded = 1;
    }, 100);
  }

  async init() {
    this.storage.defineDriver(cordovaSQLiteDriver);
    this.storage.create();
  }
}
