import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private user:any={};
  private BASEAPI = 'http://192.168.1.7:3007';
  private body:any ={};
  constructor(
    private http: HttpClient,
    private storage:Storage
    ) {}

  set params(body:any){
    this.body = body;
  }

  get params():any{
    return this.body;
  }

  set setBody(body:any){
    this.body=body
  }

  get getBody():any{
    return this.body;
  }

  async setUser(user:any){
    this.user = user
    await this.storage.set('user',user);
  }
  async getUser():Promise<any> {
    this.user = await this.storage.get('user') 
    return this.user;
  }

  getData(endPoint: string): Observable<any> {
    return this.http.get(this.BASEAPI + endPoint).pipe(take(1));
  }

  postData(endPoing: string, body: any): Observable<any> {
    return this.http.post(this.BASEAPI + endPoing, body).pipe(take(1));
  }

  updateData(endPoing: string, body: any): Observable<any> {
    return this.http.put(this.BASEAPI + endPoing, body).pipe(take(1));
  }

  deleteData(endPoing: string): Observable<any> {
    return this.http.delete(this.BASEAPI + endPoing).pipe(take(1));
  }

  get api():string{
    return this.BASEAPI;
  }
}
