import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { EMPTY, Observable, switchMap } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { NavController } from '@ionic/angular';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private authService:AuthService,
    private navCtrl:NavController,

  ) {}
// ####################################################

  intercept(
    request: HttpRequest<unknown>, 
    next: HttpHandler): Observable<HttpEvent<unknown>>
    {
    return next.handle(request);
  }
// ####################################################
  setToken(
    req:HttpRequest<any>,
    next:HttpHandler,
  ):Observable<HttpEvent<any>>{
    let _req = req.clone({
      setHeaders:{
        Authorization:'bearer'+this.authService.accessToken
      }
    });
    return next.handle(_req);
  }
// ####################################################

  handleNotAcceptable406(){
    this.authService.removeCredentials();
    this.navCtrl.navigateForward('/welcome');
    return EMPTY;
  }
// ####################################################
  handleNotAuthorized401(
    req:HttpRequest<any>,
    next:HttpHandler
  ):Observable<HttpEvent<any>>
  {
    return this.authService.getRefreshToken().pipe(
      switchMap((token)=>{
        return this.setToken(req, next);  
      })
    );
  }
// ####################################################

}
