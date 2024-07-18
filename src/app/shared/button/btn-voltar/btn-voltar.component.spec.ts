import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnVoltarComponent } from './btn-voltar.component';

describe('BtnVoltarComponent', () => {
  let component: BtnVoltarComponent;
  let fixture: ComponentFixture<BtnVoltarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BtnVoltarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnVoltarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
