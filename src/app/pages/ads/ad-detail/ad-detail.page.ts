import { Component, OnInit } from '@angular/core';
import { FunctionsService } from 'src/app/services/functions/functions.service';

@Component({
  selector: 'app-ad-detail',
  templateUrl: './ad-detail.page.html',
  styleUrls: ['./ad-detail.page.scss'],
})
export class AdDetailPage implements OnInit {
  constructor(private funcService: FunctionsService) {}

  ngOnInit() {}
  // #############################################################
  // #############################################################

  navigate(page: string, dir: string, path?: string) {
    this.funcService.navigate(page, dir, path);
  }
  // #############################################################
  // #############################################################
}
