import { Component, OnInit } from '@angular/core';
import { FunctionsService } from '../services/functions/functions.service';
import { DataService } from '../services/data/data.service';
import { forkJoin } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  // @ts-ignore
  user: any = {};
  loading:boolean=true;
  loadingAds:boolean=true;

  errorView:boolean=false;
  emptyView:boolean=false;
  stopLoading:boolean=false;
  ads:any[]=[];
  newAds:any[]=[];
  users:any[]=[]
  location:{lat?:number; lng?:number}={lat:0,lng:0};

  // #############################################################
  constructor(
    private funcService: FunctionsService,
    private dataService: DataService,
    private storage:Storage

  ) {}
  // #############################################################
  // #############################################################
  async ngOnInit() {
    this.user =this.storage.get('user');
    this.getAds();
  }
  // #############################################################
  // #############################################################
  getData(ev:any){

  }
  
  // #############################################################
  getAds(ev?:any){
      forkJoin([
      this.dataService.getData('/ads?status=1'),
      this.dataService.getData('/users?status=1'),
      ]).subscribe(
        (res:any[])=>{
          this.ads = res[0];
          this.users=res[1];
          this.ads.length ? this.showContentView(ev) : this.showEmptyView(ev); 
          console.log(this.ads);
          
        },
      (_err)=>{
        alert(_err.error);
        alert([..._err])
          this.showErrorView(ev);
      }
    )
  }
  // #############################################################
  navigate(page: string, dir: string, path?: string) {
    this.funcService.navigate(page, dir, path);
  }
  // #############################################################
  doRefresh(ev:any){
    this.loading = true;
    this.loadingAds = true;
    this.getAds(ev);
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

