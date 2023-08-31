import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data/data.service';
import { LocationService } from 'src/app/services/location/location.service';
import {} from '@capacitor/google-maps'
declare var google: any;
const GOOGLE_API_KEY ='AIzaSyDfLAaVdVKiNUl_1hDCBF7CUiieVUyj-NA'
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
@ViewChild('map') mapRef!:ElementRef;
  location :any =null;
  
  constructor(
    private modalCtrl:ModalController,
    private dataService:DataService,
    private locationService:LocationService,

  ) { }

  ngOnInit() {
  }
// ##############################################################
  async ionViewWillEnter(){
    this.location =this.dataService.Params.location;
    if(!this.location)this.location = await this.locationService.getCurrentLocation()||{lat:33.12584,lng:30.11565}
    await this.createMap();
  }
// ##############################################################

  async createMap(){
    let LatLng = new google.maps.LatLng(this.location.lat, this.location.lng)
    let mapOptions = {
      center:LatLng,
      zoom:8,
    };
    let map = new google.maps.Map(this.mapRef.nativeElement, mapOptions);
    this.addMarker(map, LatLng);
  }
// ##############################################################
addMarker(map:any,position:any){
  let marker = new google.maps.Marker({
    map,
    position,
    draggable:true
  })

  marker.addListener('dragend',()=>{
    this.location.lat = marker.getPosition()?.lat;
    this.location.lng = marker.getPosition()?.lng;
  });
}

// ##############################################################

async dismiss(data:any=null){
  this.modalCtrl.dismiss(data)
}
}
