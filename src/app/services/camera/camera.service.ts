import { Injectable, OnInit } from '@angular/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Directory, FileInfo, Filesystem } from '@capacitor/filesystem';
import { LoadingController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Preferences } from '@capacitor/preferences';
import { FunctionsService } from '../functions/functions.service';
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
public photos: any[] = [];
  constructor(
    private storage: Storage,
    private platform:Platform,
    private funcService:FunctionsService,

    ) {}
    ngOnInit() {
      
    }
  // #########################################################
  set images(body:any){
    this.photos.push(body)
  }
  get images(){
    return this.photos
  }
  // #########################################################

  public async selectImageFromGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri, // file-based data; provides best performance
      source: CameraSource.Photos, // automatically take a new photo with the camera
      quality: 100, // highest quality (0 to 100)
    });
    await this.savePicture(capturedPhoto);
    // Add new photo to Photos array
  }
  // #########################################################
  public async takePhoto() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri, // file-based data; provides best performance
      source: CameraSource.Camera, // automatically take a new photo with the camera
      quality: 100, // highest quality (0 to 100)
    });
        await this.savePicture(capturedPhoto);
    // Add new photo to Photos array
  } //
  // #########################################################
  private async savePicture(photo: Photo) {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(photo);
    // Write the file to the data directory
    const fileName = new Date().getTime() + photo.format;
    const image={
      name:fileName,
      path:photo.webPath,
      data:`${base64Data}`  
    }
    this.photos.push(image);  
  }

  // #########################################################
  
  // #########################################################
  private async readAsBase64(photo: Photo) {
    // "hybrid" will detect Cordova or Capacitor
    if (this.platform.is('hybrid')) {
      // Read the file into base64 format
      const file = await Filesystem.readFile({
        path: photo.path as string,
      });
      return file.data;
    } else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath!);
      const blob = await response.blob();
      return (await this.convertBlobToBase64(blob)) as string;
    }
  }
  // #########################################################
  convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

}











  // const size = (base64) => {
  //   const len = base64.replace(/^data:image\/\w+;base64,/, '').length
  //   return (len - 814) / 1.37
  //   // return len * 3 / 4
  // }
  
  // // Delete picture by removing it from reference data and the filesystem
  // public async deletePicture(photo: UserPhoto, position: number) {
  //   // Remove this photo from the Photos reference data array
  //   this.photos.splice(position, 1);

  //   // Update photos array cache by overwriting the existing photo array
  //   Preferences.set({
  //     key: this.PHOTO_STORAGE,
  //     value: JSON.stringify(this.photos),
  //   });

  //   // delete photo file from filesystem
  //   const filename = photo.filepath.substr(photo.filepath.lastIndexOf('/') + 1);
  //   await Filesystem.deleteFile({
  //     path: filename,
  //     directory: Directory.Data,
  //   });
  // }
// SIMON TEACHING
  // async selectImage() {
  //   const imagee = await Camera.getPhoto({
  //     quality: 100,
  //     allowEditing: false,
  //     resultType: CameraResultType.Base64,
  //     source: CameraSource.Photos,
  //   });

  //   if (imagee) {
  //     this.saveImage(imagee);
  //   }
  // }

  // async saveImage(photo: Photo) {
  //   // const imageData = await this.readAsBase64(photo);
  //   // console.log('Image data', imageData);
  //   const filename = new Date().getTime() + '.jpeg';
  //   const savedFile = await Filesystem.writeFile({
  //     directory: Directory.Data,
  //     path: `${IMAGE_DIR}/${filename}`,
  //     data: photo.base64String as string,
  //   });
  //   console.log(savedFile);

  //   console.log('Before adding');
  //   await this.storage.get(IMAGES_KEY).then(async (images: any[]) => {
  //     this.images = images || [];
  //     await Filesystem.readdir({
  //       directory: Directory.Data,
  //       path: IMAGE_DIR,
  //     }).then((files) => {
  //       this.loadImage(files.files);
  //     });

  //     console.log(this.images);
  //   });
  // }

  // async loadImage(files: FileInfo[]) {
  //   for (let file in files) {
  //     console.log(file);
  //   }
  // }

