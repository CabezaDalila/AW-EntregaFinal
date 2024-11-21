import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTickerComponent } from './detail-ticker.component';

describe('DetailTickerComponent', () => {
  let component: DetailTickerComponent;
  let fixture: ComponentFixture<DetailTickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailTickerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailTickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
