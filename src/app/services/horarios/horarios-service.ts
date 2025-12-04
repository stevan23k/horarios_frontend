import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Asignatura, horarios } from '../../core/horarios.model';

@Injectable({
  providedIn: 'root',
})
export class HorariosService {
  constructor(private http: HttpClient) { }
  urlHorario = 'http://localhost:3000/horarios'
  urlAsignaturas = 'http://localhost:3000/asignaturas'

  getHorarios(): Observable<HttpResponse<horarios[]>> {
    return this.http.get<horarios[]>(this.urlHorario,
      {
        observe: 'response',
        withCredentials: true
      });
  }

  deleteHorario(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(this.urlHorario + `/delete/${id}`,
      {
        observe: 'response',
        withCredentials: true
      });
  }

  getAsignaturas(): Observable<HttpResponse<Asignatura[]>> {
    return this.http.get<Asignatura[]>(this.urlAsignaturas,
      {
        observe: 'response',
        withCredentials: true
      });
  }

  createHorario(horario: horarios): Observable<HttpResponse<horarios>> {
    return this.http.post<horarios>(this.urlHorario + '/create', horario,
      {
        observe: 'response',
        withCredentials: true
      });
  }

  createAsignatura(asignatura: Asignatura): Observable<HttpResponse<Asignatura>> {
    return this.http.post<Asignatura>(this.urlAsignaturas + '/create', asignatura,
      {
        observe: 'response',
        withCredentials: true
      });
  }
}
