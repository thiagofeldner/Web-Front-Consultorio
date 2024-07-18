import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicosEditComponent } from './medicos-edit.component';

describe('MedicosEditComponent', () => {
  let component: MedicosEditComponent;
  let fixture: ComponentFixture<MedicosEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MedicosEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
