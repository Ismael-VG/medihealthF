// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class MedicoService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Medico } from '../models/medico';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  SRV : string = environment.SVR;
  constructor(
    private http : HttpClient
  ) { }

    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'Application/json'
      })
    }

  filtrar(parametros : any,pag: number, lim: number) : Observable<Medico>{
    let params = new HttpParams;
    for (const prop in parametros) {
      
      if(prop){
        params = params.append(prop, parametros[prop]);
      }
      
    }
    return this.http.get<Medico>(`${this.SRV}/filtro/medico/${pag}/${lim}`, {params:params})
      .pipe(retry(1), catchError(this.handleError));
  }

  buscar(id : any) : Observable<Medico> {
    return this.http.get<Medico>(`${this.SRV}/medico/${id}`)
    .pipe(retry(1),catchError(this.handleError));
  }

  guardar(datos : any, id? : number) : Observable<any> {
    if (id) {
      //Modificar
      return this.http.put<Medico>(` ${this.SRV}/medico/${id} `, datos, this.httpOptions)
      .pipe(retry(1),catchError(this.handleError));
    } else {
      console.log("se ejecuta el servicio del Medico crear");
      //Crear Nuevo
      return this.http.post<Medico>(` ${this.SRV}/Medico/`, datos, this.httpOptions)
      .pipe(retry(1),catchError(this.handleError));
    }
  }

  eliminar(id : any){
    return this.http.delete<Medico>(`${this.SRV}/medico/${id}`)
      .pipe(retry(1),catchError(this.handleError));
  }
  
  private handleError(error:any){
    return throwError(()=> {
      return error.status
    });
  }

}
