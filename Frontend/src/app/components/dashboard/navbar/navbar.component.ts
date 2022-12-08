import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  usuario : string = '';

  menu: any[] = [
    {
      "nombre": "Perfil",
      "redirect": "/dashboard"
  },
  {
      "nombre": "Medicos",
      "redirect": "/dashboard/medicos"
  },
  {
    "nombre": "Pacientes",
    "redirect": "/dashboard/pacientes"
}
  ];

  constructor(private authSrv: AuthService, private router : Router){

  }

  ngOnInit(): void {
    this.cargarMenu();
    this.usuario = this.authSrv.valorUsrActual.usr
    this.authSrv.usrActual.subscribe(
      data => this.usuario = data.nom
    )
  }

  cargarMenu(){
    this.menu;
  }

  onSalir(){
    this.authSrv.logout();
    this.router.navigate([""]);
  }
}
