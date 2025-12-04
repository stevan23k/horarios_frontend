import { Component, inject, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth-service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { AutoFocusModule } from 'primeng/autofocus';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-perfil',
  imports: [
    FloatLabelModule,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
    RouterModule,
    InputTextModule,
    FloatLabelModule,
    AutoFocusModule,
    PasswordModule,
    ButtonModule,
  ],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
  standalone: true,
})
export class Perfil implements OnInit {
  authSrv = inject(AuthService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  user: any = null;

  formPerfil: FormGroup = new FormGroup({
    nombres: new FormControl(''),
    apellidos: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit(): void {
    this.getPerfil();
  }

  editPerfil() {
    this.authSrv.editPerfil(this.formPerfil.value).subscribe({
      next: (data) => {
        if (data.status === 200) {
          console.log(data);
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getPerfil() {
    this.authSrv.getUserById(this.route.snapshot.params['id']).subscribe({
      next: (data) => {
        if (data.status === 200) {
          this.user = data.body;
          console.log(this.user);
          this.formPerfil.setValue({
            nombres: this.user.nombres,
            apellidos: this.user.apellidos,
            email: this.user.email,
            password: '',
          });
        }
        if (data.status == 401) {
          console.log('No se encontró el usuario');
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        if (err.status == 401) {
          this.router.navigate(['login']);
        }
      },
    });
  }
}
