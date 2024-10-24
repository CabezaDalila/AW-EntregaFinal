import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureCards } from './featureCards.component';

describe('ServicesComponent', () => {
  let component: FeatureCards;
  let fixture: ComponentFixture<FeatureCards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureCards]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeatureCards);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
