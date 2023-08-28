import { Component, OnInit } from '@angular/core';
import { FunctionsService } from '../services/functions/functions.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  constructor(
    private funcService: FunctionsService,
    private storage: Storage
  ) {}
  ngOnInit() {
    setTimeout(async () => {
      await this.funcService.dismissLoading();
    }, 1000);
    this.isAuthenticated();
  }
  // ############################################################
  // ############################################################
  navigate(page: string, dir: string, path?: string) {
    this.funcService.navigate(page, dir, path);
  }

  async isAuthenticated(): Promise<boolean> {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const authenticated = localStorage.getItem('authenticated');
      if (authenticated) {
        this.navigate('/tabs/home', 'root');
        return true;
      }
    }

    return false;
  }
}
