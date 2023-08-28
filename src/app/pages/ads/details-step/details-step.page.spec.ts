import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsStepPage } from './details-step.page';

describe('DetailsStepPage', () => {
  let component: DetailsStepPage;
  let fixture: ComponentFixture<DetailsStepPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetailsStepPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
