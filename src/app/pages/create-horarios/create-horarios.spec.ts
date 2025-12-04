import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHorarios } from './create-horarios';

describe('CreateHorarios', () => {
  let component: CreateHorarios;
  let fixture: ComponentFixture<CreateHorarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateHorarios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateHorarios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
