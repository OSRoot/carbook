import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FunctionsService } from '../services/functions/functions.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private router: Router, private funcService: FunctionsService) {
    // setInterval((isAuth: boolean) => {
    //   if (isAuth) {
    //     return
    //   }
    //   else {
    //     this.router.navigate(['/home'], { queryParams: { url: 0 } })
    //   }
    // })
  }

  canLoad(
    _route: Route,
    _segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isAuthenticated = !!localStorage.getItem('accessToken');
    console.log(isAuthenticated);
    if (isAuthenticated) {
      // this.router.navigate(['/news/45'])
      return true;
    } else {
      // You can use the get current navigation to activate the tab and the segment too
      const current_navigation = this.router.getCurrentNavigation();
      let url = '/';

      if (current_navigation) {
        url = current_navigation.extractedUrl.toString();
      }

      this.funcService.ShowErrorToast('يجب التسجيل اولاً للإستمرار');
      this.router.navigate(['/'], { queryParams: { backhome: url } });
      return false;
    }
  }
}
