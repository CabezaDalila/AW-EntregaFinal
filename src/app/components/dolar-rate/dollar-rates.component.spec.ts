import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DolarRateComponent } from './dolar-rate.component';

describe('DolarRateComponent', () => {
  let component: DolarRateComponent;
  let fixture: ComponentFixture<DolarRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DolarRateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DolarRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
