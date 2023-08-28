import { Component, OnInit } from '@angular/core';
import { FunctionsService } from 'src/app/services/functions/functions.service';

@Component({
  selector: 'app-add-wish',
  templateUrl: './add-wish.page.html',
  styleUrls: ['./add-wish.page.scss'],
})
export class AddWishPage implements OnInit {
  constructor(private funcService: FunctionsService) {}

  ngOnInit() {}

  navigate(page: string, dir: string, path?: string) {
    this.funcService.navigate(page, dir, path);
  }
}
