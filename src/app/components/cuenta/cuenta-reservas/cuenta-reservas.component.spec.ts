import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaReservasComponent } from './cuenta-reservas.component';

describe('CuentaReservasComponent', () => {
  let component: CuentaReservasComponent;
  let fixture: ComponentFixture<CuentaReservasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuentaReservasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuentaReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
