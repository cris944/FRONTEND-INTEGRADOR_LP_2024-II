export class Persona {
    id:number;
    nombre:string;
    apellido:string;
    dni:string;
    correo:string;
    telefono:string;
    pais: string;
    religion: string;
    estado:string;
    constructor(id:number = 0, nombre:string='', apellido:string='', dni:string='', correo:string='', telefono:string='',pais:string='', religion:string='', estado:string=''){
        this.id=id;
        this.nombre=nombre;
        this.apellido=apellido;
        this.dni=dni;
        this.correo=correo;
        this.telefono=telefono;
        this.pais=telefono;
        this.religion=religion;
        this.estado=estado;
    }

}