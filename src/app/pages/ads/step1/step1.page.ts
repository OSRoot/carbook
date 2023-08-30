import { Component, OnInit } from '@angular/core';
import { CameraService } from 'src/app/services/camera/camera.service';
import { DataService } from 'src/app/services/data/data.service';
import { FunctionsService } from 'src/app/services/functions/functions.service';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.page.html',
  styleUrls: ['./step1.page.scss'],
})
export class Step1Page implements OnInit {
  user:any={};
  progress = 0.0;
  uploadedName:string=''
  images: any[]=[];
  constructor(
    private funcService: FunctionsService,
    private cameraService: CameraService,
    private dataService:DataService
  ) {}

  async ngOnInit() {
  }
  async ionViewWillEnter(){
    await this.funcService.showLoading('loading...')
    this.user = await this.dataService.getUser();
    if(!this.user){
      this.funcService.dismissLoading()
      this.funcService.presentToast('login First')
      this.funcService.navigate('/welcome', 'root');
    }
    else{
      this.funcService.dismissLoading();
      return;
    }
  }
  navigate(page: string, dir: string, path?: string) {
    this.funcService.navigate(page, dir, path);
    
  }

  deleteImage(ev?:any){
    this.cameraService.deleteImage(ev)
    this.images = this.cameraService.images;
  }
  upload(ev?:any){
    this.cameraService.uploadeOneFile(ev);
    // this.deleteImage(ev);
  }
  // Select ppic Picture should be Uploaded while user selecting another picture and call the image url too
  async selectPic(ev:boolean) {
    await this.cameraService.selectImage(ev);
    this.images = await this.cameraService.images
    console.log(this.images);
    
  }

  removeImage(ev:any){
    this.cameraService.deleteImage(ev)
  }
  
  resetImages(){
    this.cameraService.images = null
  }
}
