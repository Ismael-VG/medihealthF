import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(){}

  ngOnInit(): void {
    this.cargarMenu();
  }


  menu: any[] = [];

  cargarMenu(){
    this.menu = [
      {nombre:"Dashboard", redirect:''},
      {nombre:"Informacion", redirect:''},
      {nombre:"Contacto", redirect:''},
    ]
  }
}
