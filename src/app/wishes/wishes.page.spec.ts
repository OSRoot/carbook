import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WishesPage } from './wishes.page';

describe('WishesPage', () => {
  let component: WishesPage;
  let fixture: ComponentFixture<WishesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WishesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
