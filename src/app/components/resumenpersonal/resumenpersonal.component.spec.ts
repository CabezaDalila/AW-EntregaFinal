import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenpersonalComponent } from './resumenpersonal.component';

describe('ResumenpersonalComponent', () => {
  let component: ResumenpersonalComponent;
  let fixture: ComponentFixture<ResumenpersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumenpersonalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResumenpersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
