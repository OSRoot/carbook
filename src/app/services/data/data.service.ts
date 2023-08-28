import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
const BASEAPI = 'http://192.168.1.2:3007';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getData(endPoint: string): Observable<any> {
    return this.http.get(BASEAPI + endPoint).pipe(take(1));
  }

  postData(endPoing: string, body: any): Observable<any> {
    return this.http.post(BASEAPI + endPoing, body).pipe(take(1));
  }

  updateData(endPoing: string, body: any): Observable<any> {
    return this.http.put(BASEAPI + endPoing, body).pipe(take(1));
  }

  deleteData(endPoing: string): Observable<any> {
    return this.http.delete(BASEAPI + endPoing).pipe(take(1));
  }
}
