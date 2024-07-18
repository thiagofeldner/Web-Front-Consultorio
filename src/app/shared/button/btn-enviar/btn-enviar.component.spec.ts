import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnEnviarComponent } from './btn-enviar.component';

describe('BtnEnviarComponent', () => {
  let component: BtnEnviarComponent;
  let fixture: ComponentFixture<BtnEnviarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BtnEnviarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnEnviarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
