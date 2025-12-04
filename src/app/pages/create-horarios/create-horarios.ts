import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { AutoFocusModule } from 'primeng/autofocus';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { HorariosService } from '../../services/horarios/horarios-service';
import { Asignatura } from '../../core/horarios.model';
import { MessageModule } from 'primeng/message';


@Component({
  selector: 'app-create-horarios',
  imports: [ReactiveFormsModule,
    FormsModule,
    RouterModule,
    InputTextModule,
    FloatLabelModule,
    AutoFocusModule,
    PasswordModule,
    ButtonModule,
    SelectModule,
    MessageModule
  ],
  templateUrl: './create-horarios.html',
  styleUrl: './create-horarios.css',
})
export class CreateHorarios implements OnInit {
  horariosSrv = inject(HorariosService)
  router = inject(Router)
  crv = inject(ChangeDetectorRef)
  dias = [
    { dia: 'Lunes', value: 'lunes' },
    { dia: 'Martes', value: 'martes' },
    { dia: 'Miércoles', value: 'miércoles' },
    { dia: 'Jueves', value: 'jueves' },
    { dia: 'Viernes', value: 'viernes' },
  ]

  horas = [
    { hora: '08:00', value: '08:00' },
    { hora: '09:00', value: '09:00' },
    { hora: '10:00', value: '10:00' },
    { hora: '11:00', value: '11:00' },
    { hora: '12:00', value: '12:00' },
    { hora: '13:00', value: '13:00' },
    { hora: '14:00', value: '14:00' },
    { hora: '15:00', value: '15:00' },
    { hora: '16:00', value: '16:00' },
    { hora: '17:00', value: '17:00' },
    { hora: '18:00', value: '18:00' },
  ]

  asignaturas: Asignatura[] = []

  mensajeError: string = ''

  horariosForm: FormGroup = new FormGroup({
    asignaturas: new FormControl('', { validators: [Validators.required] }),
    dia: new FormControl('', { validators: [Validators.required] }),
    hora_inicio: new FormControl('', { validators: [Validators.required] }),
    hora_fin: new FormControl('', { validators: [Validators.required] }),
  })

  createHorario() {
    this.horariosSrv.createHorario(this.horariosForm.value).subscribe({
      next: (data) => {
        alert('Horario creado exitosamente');
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.mensajeError = err.error.message
        console.log(err.error)
      }
    })
  }

  ngOnInit(): void {
    this.horariosSrv.getAsignaturas().subscribe({
      next: (data) => {
        if (data.status === 200 && data.body) {
          this.asignaturas = data.body || [];
          console.log(this.asignaturas);
          this.crv.detectChanges();
        }
      },
      error: (err) => {

        console.log('Error al cargar las asignaturas');
      }
    });
  }


}
