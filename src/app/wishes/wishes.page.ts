import { Component, OnInit } from '@angular/core';
import { FunctionsService } from '../services/functions/functions.service';

@Component({
  selector: 'app-wishes',
  templateUrl: './wishes.page.html',
  styleUrls: ['./wishes.page.scss'],
})
export class WishesPage implements OnInit {
  showClose = false;
  showOptions = false;
  constructor(private funcService: FunctionsService) {}

  ngOnInit() {}
  navigate(page: string, dir: string, path?: string) {
    this.funcService.navigate(page, dir, path);
  }
}
