import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioDistributionComponent } from './portfolio-distribution.component';

describe('PortfolioDistributionComponent', () => {
  let component: PortfolioDistributionComponent;
  let fixture: ComponentFixture<PortfolioDistributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioDistributionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortfolioDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
