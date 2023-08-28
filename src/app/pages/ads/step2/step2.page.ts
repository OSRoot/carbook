import { Component, OnInit } from '@angular/core';
import { FunctionsService } from 'src/app/services/functions/functions.service';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.page.html',
  styleUrls: ['./step2.page.scss'],
})
export class Step2Page implements OnInit {
  progress = 0.0;
  constructor(private funcService: FunctionsService) {}

  ngOnInit() {
    setTimeout(() => {
      this.progress = this.progress + 0.3;
    }, 200);
  }

  navigate(page: string, dir: string, path?: string) {
    this.funcService.navigate(page, dir, path);
  }
}
