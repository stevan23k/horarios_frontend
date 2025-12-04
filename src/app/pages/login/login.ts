import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { AutoFocusModule } from 'primeng/autofocus';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { AuthService } from '../../services/auth/auth-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,
    FormsModule,
    RouterModule,
    InputTextModule,
    FloatLabelModule,
    AutoFocusModule,
    PasswordModule,
    ButtonModule],

  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {
  authSrv = inject(AuthService)
  router = inject(Router)
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', {validators: [Validators.required, Validators.email]}),
    password: new FormControl('', {validators: [Validators.required]})
  });


  login(){
    this.authSrv.login(this.loginForm.value).subscribe({
      next: (data) => {
        if(data.status === 201){
          alert('Login exitoso');
          this.router.navigate(['/'])
        }
      },
      error: (err) => {
        alert('Error en el login');
      } 
    })

  }

}
