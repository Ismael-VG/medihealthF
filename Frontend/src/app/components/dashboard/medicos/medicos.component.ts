import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Medico } from 'src/app/shared/models/medico';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MedicoService } from 'src/app/shared/services/medico.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css'],
  animations: [
    trigger('estadoFiltro', [
      state('show', style({
        'max-height' : '100%', 'opacity' : '1', 'visibility' : 'visible' //'transform' : 'translate(12px)'
      })),
      state('hide', style({
        'max-height' : '0', 'opacity' : '0', 'visibility' : 'hidden'
      })),
        transition('show => hide', animate('600ms ease-in-out')),
        transition('hide => show', animate('1000ms ease-in-out'))
    ])
  ]
})
export class MedicosComponent implements OnInit {
  titulo: string = '';
  medicos = [new Medico()];
  filtro: any;
  frmMedico: FormGroup;
  pagActual = 1;
  itemsPPag = 5;
  numRegs = 0;
  paginas = [2, 5, 10, 20, 50];
  filtroVisible : boolean = false;
  clave : string = "idMedico";
  reversa : boolean = false;
  constructor(
    private srvMedico: MedicoService,
    private fb: FormBuilder,
    private router : Router,
    // private srvImpresion : ImpresionService
    ) {
    this.frmMedico = this.fb.group({
      id: [''],
      idMedico: ['', [Validators.required, Validators.maxLength(15)]],
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern("([a-zA-ZÑñÁÉÍÓÚáéíóú]*)( ([a-zA-ZÑñÁÉÍÓÚáéíóú]*)){0,1}")]],
      apellidoUno: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15), Validators.pattern("([a-zA-ZÑñÁÉÍÓÚáéíóú]*)")]],
      apellidoDos: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15), Validators.pattern("([a-zA-ZÑñÁÉÍÓÚáéíóú]*)")]],
      ubicacion: ['', [Validators.required, Validators.minLength(5)]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.pattern('[0-9]{4}-[0-9]{4}')]],
      fechaNacimiento: ['', Validators.required],
      perfilEmpresarial: [''],
      estado: ['']
    });
  }

  onOrden(clave : string){
    if (this.clave === clave) {
      this.reversa = !this.reversa;
    }
    this.clave = clave;
  }

  resetearFiltro(){
    this.filtro = {
      idMedico: '',
      nombre: '',
      apellidoUno: '',
      apellidoDos: '',
    };
    this.filtrar();
  }

  onFiltroChange(e : any){
    this.filtro = e;
    this.filtrar();
  }

  //Eventos principales botones opcional ponerlos public, ya viene por defecto
  onNuevo() {
    this.titulo = 'Nuevo medico';
    this.frmMedico.reset();
  }

  onEditar(id: any) {
    this.titulo = 'Modificar medico';
    this.srvMedico.buscar(id).subscribe({
      next: (data) => {
        console.log(data);
        // delete data.fechaIngreso;
        this.frmMedico.setValue(data);
      },
    });
  }

  onEliminar(id: any, nombre: string) {
    Swal.fire({
      title: `Eliminar medico  ${id}?`,
      text: nombre,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.srvMedico.eliminar(id).subscribe({
          complete: () => {
            this.filtrar();
            Swal.fire('Eliminado!', '', 'success');
          },
          error: (error) => {
            switch (error) {
              case 404:
                {
                  Swal.fire({
                    title: 'Id medico no encontrado',
                    icon: 'error',
                    showCancelButton: true,
                    showConfirmButton: false,
                    cancelButtonColor: '#d33',
                    cancelButtonText: 'Cerrar',
                  });
                }

                break;

              case 412:
                {
                  Swal.fire({
                    title: 'No se puede eliminar',
                    text: 'El medico tiene un artefacto relacionado',
                    icon: 'error',
                    showCancelButton: true,
                    showConfirmButton: false,
                    cancelButtonColor: '#d33',
                    cancelButtonText: 'Cerrar',
                  });
                }

                break;
              default:
                break;
            }
          },
        });
      }
    });
  }

  onCambioPag(e : any){
    this.pagActual = e;
    this.filtrar();
  }

  onCambioTama(e : any){
    this.itemsPPag = e.target.value;
    this.pagActual = 1;
    this.filtrar();
  }

  get stateFiltro(){
    return this.filtroVisible ? 'show' : 'hide';
  }

  get E(){
    return this.frmMedico.controls;
  }

  onGuardar() {
    let llamada: Observable<any>;
    let texto: string;
    const datos = new Medico(this.frmMedico.value);
    if (datos.id) {
      const id = datos.id;
      delete datos.id;
      llamada = this.srvMedico.guardar(datos, id);
      texto = 'Cambios guardados de forma correcta';
    } else {
      delete datos.id;
      llamada = this.srvMedico.guardar(datos);
      texto = 'Creado de forma correcta';
    }

    llamada.subscribe({
      complete: () => {
        console.log("complete")
        this.filtrar();
        Swal.fire({
          icon: 'success',
          title: texto,
          showConfirmButton: false,
          timer: 1500,
        });
      },
      error: (e) => {
        switch (e) {
          case 200: {
            console.log("200");

          }
          break;
          case 404:
            {
              console.log("error 404")
              Swal.fire({
                title: 'Id medico no encontrado',
                icon: 'error',
                showCancelButton: true,
                showConfirmButton: false,
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cerrar',
              });
            }
          break;
          case 409:
            {
              console.log("error 409")
              Swal.fire({

                title: 'Id medico ya existe',
                icon: 'error',
                showCancelButton: true,
                showConfirmButton: false,
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cerrar',
              });
            }
          break;
          default: {

          }
          break;
        }
      },
    });

    console.log("termina el metodo")

  }

  //Eventos generales botones

  onFiltrar() {
    this.filtroVisible = !this.filtroVisible;
    if (!this.filtroVisible) {
      this.resetearFiltro();
    }
  }

  onImprimir() {
    const encabezado = ["Id", "Nombre", "Celular", "Correo"];
    const cuerpo = ["11111", "Luis West Grant", "11212", "Luis@gmail.com"];

    this.srvMedico.filtrar(this.filtro, 1, this.numRegs).subscribe(
      data => {
        const cuerpo = Object(data)['datos'].map(
          (obj : any) => {
            const datos = [
              obj.idMedico,
              obj.nombre + " " + obj.apellidoUno + " " + obj.apellidoDos,
              obj.celular,
              obj.correo
            ]
            return datos;
          }
        )
        // this.srvImpresion.imprimir(encabezado, cuerpo, "Listado de medicos", true);
      }
    )
  }

  onCerrar() {
    this.router.navigate(["dashboard"]);
  }

  private filtrar(): void {
    this.srvMedico.filtrar(this.filtro, this.pagActual, this.itemsPPag).subscribe((data) => {
      console.log(data);
      this.medicos = Object(data)['datos'];
      this.numRegs = Object(data)['cant'];
    });
  }

  ngOnInit(): void {
    this.resetearFiltro();
    //console.log(this.srvAuth.valorUsrActual);
    //console.log(this.srvToken.tiempoExpToken());
  }
}
