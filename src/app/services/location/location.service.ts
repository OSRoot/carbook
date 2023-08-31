import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import {Geolocation} from '@capacitor/geolocation'
@Injectable({
  providedIn: 'root'
})
export class LocationService {
  location:{lat:number,lng:number} = {
    lat:0,
    lng:0
  }
  private API_URL:string='http://localhost:3007';
  constructor() { }

  async getCurrentLocation(){
    if(Capacitor.getPlatform()=='web') return this.location;
    await Geolocation.checkPermissions().then(async (permission)=>{
      if (permission.location=='denied'){
        await Geolocation.requestPermissions();
      }
      const coordinates = await Geolocation.getCurrentPosition();
      if (coordinates.coords){
        this.location.lat = coordinates.coords.latitude;
        this.location.lng =coordinates.coords.longitude;
      }
    })
    return this.location;
  }

}

