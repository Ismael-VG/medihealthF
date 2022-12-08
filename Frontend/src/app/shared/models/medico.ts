export class Medico {
    id?: number;
    idMedico?: string;
    nombre: string;
    apellidoUno: string;
    apellidoDos: string;
    ubicacion: string;
    correo: string;
    telefono: string;
    fechaNacimiento?: Date;
    perfilEmpresarial: string;
    estado: string;

    constructor(c?: Medico) {
        if (c?.id !== undefined) {
            this.id = c?.id;
        }

        // if (c?.idMedico !== undefined) {
        //     this.idMedico = c?.idMedico;
        // }
       this.idMedico = c !== undefined ? c.idMedico : '';
        this.nombre = c !== undefined ? c.nombre : '';
        this.apellidoUno = c !== undefined ? c.apellidoUno : '';
        this.apellidoDos = c !== undefined ? c.apellidoDos : '';
        this.ubicacion = c !== undefined ? c.ubicacion : '';
        this.correo = c !== undefined ? c.correo : '';
        this.telefono = c !== undefined ? c.telefono : '';
 


        if (c?.fechaNacimiento !== undefined) {
            this.fechaNacimiento = c.fechaNacimiento;
        }
        this.perfilEmpresarial = c !== undefined ? c.perfilEmpresarial : '';
        this.estado = c !== undefined ? c.estado : '';
        if (c?.perfilEmpresarial !== undefined) {
            this.perfilEmpresarial = c.perfilEmpresarial;
        }
        if (c?.estado !== undefined) {
            this.estado = c.estado;
        }

    }  
}



// export class Medico {
//     id? : number;
//     idCliente : string;
//     nombre : string;
//     apellido1 : string;
//     apellido2 : string;
//     celular : string;
//     telefono : string;
//     direccion : string;
//     correo : string;
//     fechaIngreso? : Date;
//     /**
//      *
//      */
//     constructor(c? : Cliente) {
//         if (c?.id !== undefined) {
//             this.id = c?.id;
//         }
//         this.idCliente = c !== undefined ? c.idCliente : '';
//         this.nombre = c !== undefined ? c.nombre : '';
//         this.apellido1 = c !== undefined ? c.apellido1 : '';
//         this.apellido2 = c !== undefined ? c.apellido2 : '';
//         this.telefono = c !== undefined ? c.telefono : '';
//         this.celular = c !== undefined ? c.celular : '';
//         this.direccion = c !== undefined ? c.direccion : '';
//         this.correo = c !== undefined ? c.correo : '';
//         if (c?.fechaIngreso !== undefined) {
//             this.fechaIngreso = c.fechaIngreso;
//         }
//     }
// }
