import { Injectable, OnInit } from '@angular/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { Directory, FileInfo, Filesystem } from '@capacitor/filesystem';
import { LoadingController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
// Set INTERFACE TO THE IMAGE
interface LocalImage {
  name: string;
  path: string;
  data: string;
}
const IMAGES_KEY = 'IMAGES';
const IMAGE_DIR = 'stored-images';
@Injectable({
  providedIn: 'root',
})
export class CameraService implements OnInit {
  images!: any[];
  constructor(private storage: Storage) {}
  async ngOnInit(): Promise<void> {}

  ionViewWillEnter() {}
  // #########################################################
  // #########################################################

  async selectImage() {
    const imagee = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
    });

    if (imagee) {
      this.saveImage(imagee);
    }
  }

  async saveImage(photo: Photo) {
    // const imageData = await this.readAsBase64(photo);
    // console.log('Image data', imageData);
    const filename = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      directory: Directory.Data,
      path: `${IMAGE_DIR}/${filename}`,
      data: photo.base64String as string,
    });
    console.log(savedFile);

    console.log('Before adding');
    await this.storage.get(IMAGES_KEY).then(async (images: any[]) => {
      this.images = images || [];
      await Filesystem.readdir({
        directory: Directory.Data,
        path: IMAGE_DIR,
      }).then((files) => {
        this.loadImage(files.files);
      });

      console.log(this.images);
    });
  }

  async loadImage(files: FileInfo[]) {
    for (let file in files) {
      console.log(file);
    }
  }
}
