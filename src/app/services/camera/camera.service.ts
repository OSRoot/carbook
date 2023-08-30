import { Injectable, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource, ImageOptions, Photo} from '@capacitor/camera';
import {  Filesystem } from '@capacitor/filesystem';
import { ActionSheetController, LoadingController, Platform } from '@ionic/angular';
import { finalize } from 'rxjs';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FunctionsService } from '../functions/functions.service';
import { DataService } from '../data/data.service';
// Set INTERFACE TO THE IMAGE
interface LocalImage {
  name: string,
  progress:number,
  data: string,
}

const IMAGES_KEY = 'IMAGES';
const IMAGE_DIR = 'stored-images';
@Injectable({
  providedIn: 'root',
})
export class CameraService implements OnInit {
  private uploadProgress:number=0;
  public photos: LocalImage[] = [];
  private imageNames:string[]=[];
  private loading:any|null;
  constructor(
    private platform:Platform,
    private http:HttpClient,
    private loadCtrl:LoadingController,
    private actionSheetCtrl:ActionSheetController,
    private dataService:DataService,
    private funcService:FunctionsService

    ) {}
    ngOnInit() {
      
    }
  // #########################################################
  get progress():any{
    return this.uploadProgress
  }
  set images(body:any){
    this.photos.push(body)
  }
  get images(){
    return this.photos
  }
  get imagesNames():string[]{
    return this.imageNames;
  }
  // #########################################################

  // #########################################################
  // This Action sheet can be used instead of making the modal manual
  
  async showActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: "اخطار الصور",
      mode: "ios",
      buttons: [
        {
          text: "التقاط صورة",
          icon: "camera",
          handler: async () => {
            // capture image
            const image = await this.selectImage();
            actionSheet.dismiss(image)
            if(!image) return
            this.images.push(image)
          }
        },
        {
          text: "اختيار صور",
          icon: "image",
          handler: async () => {
            // get image
            const image = await this.selectImage(false);
            actionSheet.dismiss(image)
            if(!image) return
            this.images.push(image)
          }
        },
        {
          text: 'الغاء',
          role: 'cancel',
        },
      ]
    })

    await actionSheet.present();
    const data = await actionSheet.onDidDismiss()
    console.log(data?.data);

    if(data?.data) return data?.data
  }

// ##########################################################
async selectImage(camera: boolean = true) {
  const options:ImageOptions = {
    quality: 60,
    allowEditing: false,
    resultType: CameraResultType.Uri,
    saveToGallery:true,
    source: camera ? CameraSource.Camera : CameraSource.Photos // Camera, Photos or Prompt!
  }
  const image = await Camera.getPhoto(options);
  if (image) return await this.saveImage(image);
  else return
}
  // #########################################################

async saveImage(photo: Photo) {
  const base64Data = await this.readAsBase64(photo) as string;
  const fileName = new Date()
                    .getTime() + '' + '_' +
                    ((photo.webPath as string)
                    .lastIndexOf('/') + 1) +
                    `.${photo.format}`;
  const image = {
      name: fileName,
      path:`${IMAGE_DIR}/${fileName}`,
      data:base64Data.includes(`data:image`) ?
          base64Data : `data:image/${photo.format};base64,${base64Data}`,
      progress: 0
  }
  this.photos.push(image);
  console.log(this.photos);
  
  return image
}
  // #########################################################
  private async readAsBase64(photo: Photo) {
    if (this.platform.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: photo.path as string
      });
      return file.data;
    }
    else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath as string);
      const blob = await response.blob();
      return await this.convertBlobToBase64(blob) as string;
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

  // #########################################################
async uploadeOneFile(image:any){
  this.loading = await this.loadCtrl.create({
    message:'Uploading image...'
  });
  await this.loading.present();
  if (image.progress) {
    this.funcService.presentToast('Image already uploaded, press continue')
    this.loading.dismiss()
    return null;
  }
  const promise = new Promise(async (resolve)=>{
    const fileBody = await this.createFormData(image);
    this.http.post(this.dataService.api+'/uploadOne', fileBody,{
      reportProgress: true,
      observe: 'events',
    }).subscribe((event:any)=>{
      if (event.type == HttpEventType.UploadProgress){
        image.progress = Math.round(event.loaded / event.total);
      }
      else if (event.type == HttpEventType.Response){
        this.imageNames.push(event.body.filename as string)
        resolve(event.body as string)
      }
      this.loading.dismiss()
    }, (err)=>{
      resolve(null);
    })
  })
  return promise
}

  // #########################################################

async createFormData(image:any) {
  let formData = new FormData()
  const response = await fetch(image.data);
  const blob = await response.blob();
  formData.append('file', blob, image.name)
  return formData
}


deleteImage(image:any) {
  this.photos = this.photos.filter((img:any) => img.name != image.name)
}


}

