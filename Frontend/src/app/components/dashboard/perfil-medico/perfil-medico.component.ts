import { Component, OnInit} from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Medico } from 'src/app/shared/models/medico';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MedicoService } from 'src/app/shared/services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil-medico',
  templateUrl: './perfil-medico.component.html',
  styleUrls: ['./perfil-medico.component.css']
})
export class PerfilMedicoComponent {

  usuario: string = '';
  nombre: string = '';
  ubicacion: string = '';
  correo: string = '';
  telefono: string = '';
  idb: string = '';
  fechaNacimiento: string = '';
  titulo: string = '';
  frmMedico: FormGroup;
  medicos = [new Medico()];
  

  constructor(
    private svrMedico: MedicoService,
    private authSrv: AuthService,
    private fb: FormBuilder,
  ) { 
    this.frmMedico = this.fb.group({
      id: [''],
      idMedico: ['', Validators.required],
      nombre: ['', [Validators.required, Validators.minLength(2),
      Validators.maxLength(50),
      Validators.pattern('([A-Za-zÑñáéíóú]*)( ([A-Za-zÑñáéíóú]*)){0,1}')]],
      apellidoUno: ['', [Validators.required, Validators.minLength(2),
      Validators.maxLength(50),
      Validators.pattern('([A-Za-zÑñáéíóú]*)')]],
      apellidoDos: ['', [Validators.required, Validators.minLength(2),
      Validators.maxLength(50),
      Validators.pattern('([A-Za-zÑñáéíóú]*)')]],
      ubicacion: ['', [Validators.required, Validators.minLength(5)]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.pattern('[0-9]{4}-[0-9]{4}')]],
      fechaNacimiento: ['', Validators.required],
      perfilEmpresarial: [''],
      estado: ['']
    });
  }

  onBuscar() {
    this.usuario = this.authSrv.valorUsrActual.usr
    this.authSrv.usrActual
      .subscribe(
        data => this.usuario = data.usr
      )


    this.svrMedico.buscar(this.usuario)
      .subscribe({
        next: (data) => {
          this.nombre = data.nombre + ' ' + data.apellidoUno + ' ' + data.apellidoDos;
          this.ubicacion= data.ubicacion;
          this.correo= data.correo;
          this.telefono= String(data.telefono);
          this.fechaNacimiento= String(data.fechaNacimiento);
          this.idb= String(data.id);
        }
      })
  }

  onEditar(id: any) {
    this.titulo = 'Modificar datos personales ';
    this.svrMedico.buscar(id)
      .subscribe({
        next: (data) => {
          this.frmMedico.setValue(data);
        }
      })
  }



  onGuardar() {
     let llamada: Observable<any>;
     let texto: string = '';
     const datos = new Medico(this.frmMedico.value);
       const id = datos.id;
       delete datos.id;
       delete datos.idMedico;
       llamada = this.svrMedico.guardar(datos, id);
       texto = '¡Cambios guardados de forma correcta!';
     llamada
       .subscribe({
         complete: () => {
          this.onBuscar();
           Swal.fire({
             icon: 'success',
             title: texto,
             showConfirmButton: false,
             timer: 1500
             
           })
         },
         error: (e) => {
           if(404)
               Swal.fire({
                 title: "id Medico no Encontrado",
                 icon: 'error',
                 showCancelButton: true,
                 showConfirmButton: false,
                 cancelButtonColor: '#d33',
                 cancelButtonText: 'Cerrar'
               })
         }
       })

  }
  
 
  get E() {
    return this.frmMedico.controls;
  }
  ngOnInit(): void {
    this.onBuscar();
  }
}
