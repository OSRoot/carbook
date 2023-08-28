import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TesrPage } from './tesr.page';

describe('TesrPage', () => {
  let component: TesrPage;
  let fixture: ComponentFixture<TesrPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TesrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
