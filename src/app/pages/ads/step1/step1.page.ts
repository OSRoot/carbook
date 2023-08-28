import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { CameraService } from 'src/app/services/camera/camera.service';
import { FunctionsService } from 'src/app/services/functions/functions.service';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.page.html',
  styleUrls: ['./step1.page.scss'],
})
export class Step1Page implements OnInit {
  progress = 0.0;
  image!: File;
  images!: any[];

  constructor(
    private funcService: FunctionsService,
    private cameraService: CameraService,
    private storage: Storage
  ) {}

  async ngOnInit() {
    await this.storage.get('IMAGES').then((images: any[]) => {
      this.images = images || [];
      console.log(this.images);
    });
  }

  navigate(page: string, dir: string, path?: string) {
    this.funcService.navigate(page, dir, path);
  }

  // Select ppic
  selectPic() {
    this.cameraService.selectImage();
  }
}
