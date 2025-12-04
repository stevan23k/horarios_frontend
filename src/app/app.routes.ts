import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { CreateHorarios } from './pages/create-horarios/create-horarios';
import { CreateAsignaturas } from './pages/create-asignaturas/create-asignaturas';
import { Perfil } from './pages/perfil/perfil';
import { canActivateAuth } from './auth-guard';
import { RenderMode } from '@angular/ssr';

export const routes: Routes = [{
    canActivate: [canActivateAuth],
    path: '',
    component: Home
},
{
    path: 'login',
    component: Login
},
{
    path: 'register',
    component: Register
},
{
    canActivate: [canActivateAuth],
    path: 'create',
    children: [
        { path: 'horarios', component: CreateHorarios },
        { path: 'asignaturas', component: CreateAsignaturas }
    ]
},
{
    path: 'perfil/:id',
    loadComponent: () => import('./pages/perfil/perfil').then(m => m.Perfil),
    data: { renderMode: RenderMode.Server } 
}

];
