import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnAlterarComponent } from './btn-alterar.component';

describe('BtnAlterarComponent', () => {
  let component: BtnAlterarComponent;
  let fixture: ComponentFixture<BtnAlterarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BtnAlterarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnAlterarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
