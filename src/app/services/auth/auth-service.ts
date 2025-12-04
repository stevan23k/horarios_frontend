import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../core/horarios.model';
import { nextTick } from 'process';

export interface loginInterface {
  email: string;
  password: string;
}
export interface registerInterface {
  nombres: string;
  apellidos: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) { }
  authUrl = 'http://localhost:3000/auth'
  usuariosUrl = 'http://localhost:3000/usuarios'



  login(user: loginInterface): Observable<HttpResponse<loginInterface>> {
    return this.http.post<loginInterface>(this.authUrl + '/login', user,
      {
        observe: 'response',
        withCredentials: true
      });
  }

  perfil(): Observable<HttpResponse<any>> {
    return this.http.get<any>(this.authUrl + '/perfil',
      {
        observe: 'response',
        withCredentials: true
      }
    )
  }

  editPerfil(user: User): Observable<HttpResponse<User>> {
    return this.http.put<User>(this.usuariosUrl + `/edit`, user,
      {
        observe: 'response',
        withCredentials: true
      }
    )
  }

  getUserById(id: number): Observable<HttpResponse<User>> {
    return this.http.get<any>(this.usuariosUrl + `/perfil/${id}`,
      {
        observe: 'response',
        withCredentials: true

      })
  }

  register(user: registerInterface): Observable<HttpResponse<registerInterface>> {
    return this.http.post<registerInterface>(this.authUrl + '/register', user, {
      observe: 'response',
      withCredentials: true
    })
  }


  logout(): Observable<HttpResponse<any>> {
    return this.http.get<any>(this.authUrl + '/logout',
      {
        observe: 'response',
        withCredentials: true
      }
    )
  }

}
