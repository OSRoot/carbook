import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExposDetailPage } from './expos-detail.page';

describe('ExposDetailPage', () => {
  let component: ExposDetailPage;
  let fixture: ComponentFixture<ExposDetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ExposDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
