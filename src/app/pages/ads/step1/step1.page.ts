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
  // @ts-ignore
  images: any[]=null;

  constructor(
    private funcService: FunctionsService,
    private cameraService: CameraService,

  ) {}

  async ngOnInit() {
  }

  navigate(page: string, dir: string, path?: string) {
    this.funcService.navigate(page, dir, path);
    
  }

  // Select ppic Picture should be Uploaded while user selecting another picture and call the image url too
  async selectPic() {
    await this.cameraService.selectImageFromGallery();
    this.images = await this.cameraService.images
    console.log(this.images);
  }
  // Take a pic
  async takePicture(){
    this.cameraService.takePhoto()
    this.images = await this.cameraService.images
    console.log(this.images);
  }
}
