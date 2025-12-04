import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAsignaturas } from './create-asignaturas';

describe('CreateAsignaturas', () => {
  let component: CreateAsignaturas;
  let fixture: ComponentFixture<CreateAsignaturas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAsignaturas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAsignaturas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
