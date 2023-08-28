import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddWishPage } from './add-wish.page';

describe('AddWishPage', () => {
  let component: AddWishPage;
  let fixture: ComponentFixture<AddWishPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddWishPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
