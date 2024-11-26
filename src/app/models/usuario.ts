import { Persona } from "./persona";

export class Usuario {
  id_usuario: number;
  img_perfil: string;
  username: string;
  password: string;
  estado: string;
  persona: Persona;

  constructor(
    id_usuario: number = 0,
    img_perfil: string = 'https://i.postimg.cc/zG9cQ5sg/585e4beacb11b227491c3399-2.png',
    username: string = '',
    password: string = '',
    estado: string = '',
    persona: Persona = new Persona()
  ) {
    this.id_usuario = id_usuario;
    this.img_perfil = img_perfil;
    this.username = username;
    this.password = password;
    this.estado = estado;
    this.persona = persona;
  }
}