import { Persona } from "./persona";

export class Estudiante {
  id: number;
  ciclo: string;
  grupo: string;
  correo_institucional: string;
  codigo: string;
  persona: Persona;

  constructor(
    id: number = 0,
    codigo: string = '',
    ciclo: string='',
    grupo: string= '',
    correo_institucional: string='',
    persona: Persona = new Persona()
  ) {
    this.id = id;
    this.codigo = codigo;
    this.ciclo= ciclo;
    this.grupo= grupo;
    this.correo_institucional= correo_institucional;
    this.persona = persona;
  }
}