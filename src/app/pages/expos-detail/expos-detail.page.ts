import { Component, OnInit } from '@angular/core';
import { FunctionsService } from 'src/app/services/functions/functions.service';

@Component({
  selector: 'app-expos-detail',
  templateUrl: './expos-detail.page.html',
  styleUrls: ['./expos-detail.page.scss'],
})
export class ExposDetailPage implements OnInit {
  showClose = false;
  showOptions = false;
  filterBy!: string;
  constructor(private funcService: FunctionsService) {}

  ngOnInit() {}

  navigate(page: string, dir: string, path?: string) {
    this.funcService.navigate(page, dir, path);
  }
}
