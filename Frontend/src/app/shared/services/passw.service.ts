// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class PasswService {

//   constructor() { }
// }


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswService {

  constructor(
    private http : HttpClient
  ) { }


  public resetearPassw(datos : any) : Observable<any>{
    return this.http.patch<any>(`${environment.SVR}/usuario/passw/reset`, datos)
  }
  public cambioPassw(datos : any) : Observable<any>{
    return this.http.patch<any>(`${environment.SVR}/usuario/passw/cambio`, datos)
  }

}
