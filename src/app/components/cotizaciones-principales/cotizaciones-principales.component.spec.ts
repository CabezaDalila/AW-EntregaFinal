import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizacionesPrincipalesComponent } from './cotizaciones-principales.component';

describe('CotizacionesPrincipalesComponent', () => {
  let component: CotizacionesPrincipalesComponent;
  let fixture: ComponentFixture<CotizacionesPrincipalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CotizacionesPrincipalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CotizacionesPrincipalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
