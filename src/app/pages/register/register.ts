import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import {  Router, RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { AutoFocusModule } from 'primeng/autofocus';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { AuthService } from '../../services/auth/auth-service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,
    FormsModule,
    RouterModule,
    InputTextModule,
    FloatLabelModule,
    AutoFocusModule,
    PasswordModule,
    ButtonModule,
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  authSrv = inject(AuthService)
  router = inject(Router)
  registerForm: FormGroup = new FormGroup({
    nombres: new FormControl('', {validators: [Validators.required]}),
    apellidos: new FormControl('', {validators: [Validators.required]}),
    email: new FormControl('', {validators: [Validators.required, Validators.email]}),
    password: new FormControl('', {validators: [Validators.required]}),

  })

  register(){
    this.authSrv.register(this.registerForm.value).subscribe({
      next: (data) => {
        if(data.status === 201){
          alert('Registro exitoso');
        }
        if(data.status === 500){
          alert('el email ya esta en uso');
        }
      },
      error: (err) => {
        alert('Error en el registro o email en uso');
      }

    })

  }

}
