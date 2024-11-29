  export interface Solicitud {
      id: number;
      estudiante: {
        id: number;
        nombre: string;
      };
      empresa?: {
        id: number;
        nombre: string;
      };
      linea?: {
        id: number;
        nombre: string;
      };
      estado: string;
      fechaCreacion: string; 
    }