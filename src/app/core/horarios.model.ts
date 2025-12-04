export interface User {
    id: number;
    nombres: string;
    apellidos: string;
    email: string;
    password: string;
}

export interface Asignatura{
    id: number;
    nombre: string;
    descripcion: string;
    max_hora_semana: number;
}

export interface horarios{
    id: number;
    dia: string;
    hora_inicio: string;
    hora_fin: string;
    usuario: User
    asignatura: Asignatura
}