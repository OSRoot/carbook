import { Component, OnInit } from '@angular/core';
import { FunctionsService } from '../services/functions/functions.service';
import { Ad } from '../interfaces/interfaces';
import { Storage } from '@ionic/storage-angular';
import { DataService } from '../services/data/data.service';

@Component({
  selector: 'app-my-ads',
  templateUrl: './my-ads.page.html',
  styleUrls: ['./my-ads.page.scss'],
})
export class MyAdsPage implements OnInit {
  filterBy!: string;
  user:any={}
  showOptions = false;
  showClose = false;
  loading:boolean=true;
  loadingAds:boolean=true;
  errorView:boolean=false;
  emptyView:boolean=false;
  myAds!: Ad[];
  constructor(
    private funcService: FunctionsService,
    private storage: Storage,
    private dataService: DataService
  ) {}
  // ####################################################################
  async ngOnInit() {
    await this.getMyAds();
    // this.ads.push()
  }
  // ####################################################################
  navigate(page: string, dir: string, path?: string) {
    this.funcService.navigate(page, dir, path);
  }
  // ####################################################################
  setFilter(ev: any) {
    this.filterBy = ev.detail.value;
  }
  // ####################################################################
  async deleteItem(id: string | undefined) {
    this.funcService.confirmAlert({header:'تأكيد',message:'هل أنت متأكد من الحذف؟'})
    .then(async (res) => {
      if (res === true) {
        this.funcService.showLoading('حذف')
        this.dataService.deleteData('/ad/' + id).subscribe(
          async (res) => {
            console.log(res);
            await this.getMyAds();
            await this.funcService.presentToast('تم الحذف', false)
            this.funcService.dismissLoading()
          },
          (err) => {
            this.funcService.dismissLoading()
            console.log(err);
            return
          }
        );
      } else {
        return;
      }
    });
  }
 // #############################################################
doRefresh(ev:any){
  this.loading = true;
  this.loadingAds = true;
  this.getMyAds(ev);
}
// #############################################################
  async getMyAds(ev?:any) {
    this.myAds = await this.storage.set('myAds', []);
    this.user = await this.dataService.getUser()    
    this.dataService.getData('/ad/' + this.user._id).subscribe(
      async (res) => {
        console.log(res);
        this.myAds = res.ads;
        this.myAds.length ? this.showContentView(ev) : this.showEmptyView(ev); 
      },
      async (err) => {
        console.log(err);
      }
    );
  }

   // #############################################################
  showContentView(ev:any){
    this.loading = false;
    this.errorView = false;
    this.emptyView = false;
    if (ev) ev.target.complete();
  }
  // #############################################################
  showErrorView(ev:any){
    this.loading = false;
    this.errorView = true;
    this.emptyView = false;
    if (ev) ev.target.complete();
  }
  // #############################################################
  showEmptyView(ev:any){
    this.loading = false;
    this.errorView = false;
    this.emptyView = true;
    if (ev) ev.target.complete();
  }
  // #############################################################
}
