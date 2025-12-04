import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { AutoFocusModule } from 'primeng/autofocus';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { HorariosService } from '../../services/horarios/horarios-service';

@Component({
  selector: 'app-create-asignaturas',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    InputTextModule,
    FloatLabelModule,
    AutoFocusModule,
    PasswordModule,
    ButtonModule,
    SelectModule,
  ],
  templateUrl: './create-asignaturas.html',
  styleUrl: './create-asignaturas.css',
})
export class CreateAsignaturas {
  horariosSrv = inject(HorariosService);
  router = inject(Router);
  createForm: FormGroup = new FormGroup({
    nombre: new FormControl('', { validators: [Validators.required] }),
    descripcion: new FormControl('', { validators: [Validators.required] }),
    max_hora_semana: new FormControl({ validators: [Validators.required] }),
  });
  horas = [
    { hora: '3', value: 3 },
    { hora: '4', value: 4 },
    { hora: '5', value: 5 },
  ];

  createAsignatura() {
    this.horariosSrv.createAsignatura(this.createForm.value).subscribe({
      next: (data) => {
        if (data.status === 201) {
          alert('Asignatura creada con exito');
          this.createForm.reset();
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        alert('Error al crear la asignatura');
      },
    });
  }
}
