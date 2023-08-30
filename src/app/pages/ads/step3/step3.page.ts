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
  myAd: any={};
  myAds: any[]=[];
  user:any={}
  constructor(
    private funcService: FunctionsService,
    private dataService: DataService,
  ) {}
  form!: FormGroup;
  price!: number;
  phoneNumber!: string;
  userId!: string;
  userName!: string;
  async ngOnInit() {
    this.form = new FormGroup({
      phone: new FormControl(this.phoneNumber, Validators.required),
      price: new FormControl('', Validators.required),
    });
    console.log(this.dataService.getBody);
    this.user = await this.dataService.getUser();
    console.log(this.user);
    
    this.phoneNumber = this.user.phone
  }

  // #######################################################
  navigate(page: string, dir: string, path?: string) {
    this.funcService.navigate(page, dir, path);
  }
  // #######################################################
  
  async postAd() {
    this.myAd = await this.dataService.getBody;
    this.myAd['phoneNumber']=this.user.phone;
    this.myAd['advertiserId']=this.user._id;
    this.myAd['advertiserName']=this.user.fullname;
    this.myAd.price = this.price
    this.dataService.postData('/ad/create', this.myAd).subscribe(
      async (_res) => {
        console.log(_res);
        await this.funcService.presentToast('تم نشر الإعلان بنجاح',false);
        this.funcService.navigate('/tabs', 'root')
      },
      async (_err) => {
        console.log(_err);
        await this.funcService.presentToast('حدث خطأ، حاول مرة أخرى');
        return;
      }
    );
    this.navigate('tabs/home', 'forward');
  }
}
