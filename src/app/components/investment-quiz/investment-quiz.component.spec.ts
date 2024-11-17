import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentQuizComponent } from './investment-quiz.component';

describe('InvestmentQuizComponent', () => {
  let component: InvestmentQuizComponent;
  let fixture: ComponentFixture<InvestmentQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestmentQuizComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvestmentQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
