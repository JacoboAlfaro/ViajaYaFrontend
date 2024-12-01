import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaOpinionesComponent } from './cuenta-opiniones.component';

describe('CuentaOpinionesComponent', () => {
  let component: CuentaOpinionesComponent;
  let fixture: ComponentFixture<CuentaOpinionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuentaOpinionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuentaOpinionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
