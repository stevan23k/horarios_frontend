import { Component, inject } from '@angular/core';
import { HorariosService } from '../../services/horarios/horarios-service';
import { OnInit } from '@angular/core';
import { horarios } from '../../core/horarios.model';
import { Router, RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/auth/auth-service';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  imports: [RouterModule, MenuModule, ButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',

})
export class Home implements OnInit {
  private HorariosSrv = inject(HorariosService);
  private crv = inject(ChangeDetectorRef);
  private authService = inject(AuthService);
  private router = inject(Router);

  list: horarios[] = [];

  diasDeLaSemana = [
    { nombre: 'Lunes', index: 1 },
    { nombre: 'Martes', index: 2 },
    { nombre: 'Miércoles', index: 3 },
    { nombre: 'Jueves', index: 4 },
    { nombre: 'Viernes', index: 5 },
  ];

  private diasMap: { [key: string]: number } = {
    'lunes': 1,
    'martes': 2,
    'miércoles': 3,
    'miercoles': 3,
    'jueves': 4,
    'viernes': 5,
  };

  ngOnInit(): void {
    setTimeout(() => { this.getElements(); }, 100);

  }

  getElements() {
    this.HorariosSrv.getHorarios().subscribe({
      next: (data) => {
        if (data.status === 200 && data.body) {
          this.list = data.body;
          if (data.body.length === 0) {
            console.log('No hay horarios disponibles.');
            this.router.navigate(['/create/horarios']);
          }

          this.list = this.list.sort((a, b) => {
            const diaCompare = this.getDiaIndex(a.dia) - this.getDiaIndex(b.dia);
            if (diaCompare !== 0) return diaCompare;
            return a.hora_inicio.localeCompare(b.hora_inicio);
          });
          this.crv.detectChanges();
          return
        }
      },
      error: (err) => {
        console.error('Error al cargar horarios:', err);

      },
    });
  }

  getDiaIndex(dia: string): number {
    const diaLower = dia.toLowerCase().trim();
    return this.diasMap[diaLower] || 0;
  }

  getHorariosDelDia(diaIndex: number): horarios[] {
    return this.list.filter(item => this.getDiaIndex(item.dia) === diaIndex);
  }

  editPerfil() {
    this.authService.perfil().subscribe({
      next: (data) => {
        const id = data.body?.sub;
        if (data.status === 200 && data.body) {
          console.log(data.body);
          this.router.navigate([`/perfil/${id}`]);
        }
      },
      error: (err) => {
        alert('Error al cargar el perfil');
      }
    })
  }

  createHorario() {
    this.router.navigate(['/create/horarios']);
  }
  createAsignaturas() {
    this.router.navigate(['/create/asignaturas']);
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error al cerrar sesión:', err);
      }
    });
  }

  deleteHorario(id: number) {
    this.HorariosSrv.deleteHorario(id).subscribe({
      next: (data) => {
        if (data.status === 200) {
          alert('Horario eliminado con exito');
          this.getElements();
        }
      },
      error: (err) => {
        alert('Error al eliminar el horario');
      }
    })
  }
}
