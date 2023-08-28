import { Component, OnInit } from '@angular/core';
import { Expo } from '../interfaces/interfaces';
import { FunctionsService } from '../services/functions/functions.service';
@Component({
  selector: 'app-expos',
  templateUrl: './expos.page.html',
  styleUrls: ['./expos.page.scss'],
})
export class ExposPage implements OnInit {
  filterBy!: string;
  expos: Expo[] = [
    { id: 1, name: 'معرض العراق الدولي-فرع أربيل', carsCount: 50 },
    { id: 2, name: 'معرض العراق الدولي-فرع أربيل', carsCount: 20 },
    { id: 3, name: 'معرض العراق الدولي-فرع أربيل', carsCount: 30 },
  ];
  showFilter = false;
  show_results = false;
  constructor(private funcService: FunctionsService) {}
  ngOnInit() {}

  // #############################################################
  // #############################################################

  navigate(page: string, dir: string, path?: string) {
    this.funcService.navigate(page, dir, path);
  }
  // #############################################################
  // ############################################################# /
  handleSearchInput(ev: any) {
    if (ev.target.value.length < 1) {
      console.log('no search');
      this.show_results = true;
    }
  }
  //  #############################################################
  // #############################################################

  filterChange(ev: any) {}
  setFilter(ev: any) {
    this.filterBy = ev.detail.value;
    console.log(this.filterBy);
  }
  // #############################################################
  // #############################################################
}
