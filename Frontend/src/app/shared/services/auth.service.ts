import { HttpClient } from '@angular/common/http';
import { Token } from '../models/token';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, retry, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { TokenService } from './token.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usrActualSubject = new BehaviorSubject<User>(new User());
  public usrActual = this.usrActualSubject.asObservable();

  constructor(
    private http: HttpClient,
    private svrToken: TokenService,
    private router: Router
  ) { }




  public get valorUsrActual(): User {
    return this.usrActualSubject.value
  }


  public login(user : [usr:'', passw:'']): Observable<any> {
    return this.http.post<Token>(`${environment.SVR}/auth/iniciar`, user)
      .pipe(
        retry(1),
        tap(
          tokens => {
            this.doLogin(tokens);
            console.log(tokens);
            this.router.navigate(['dashboard']);
          }
        ),
        map(() => true),
        catchError(
          error => { return of(error.status) + "no te has logeado"}
        )
      )
  }



  public logout() {
    this.http.patch(`${environment.SVR}/auth/cerrar`, { "idUsuario": this.valorUsrActual.usr })
      .subscribe();
    this.doLogout();
  }

  private doLogin(tokens: Token): void {
    this.svrToken.setTokens(tokens);
    this.usrActualSubject.next(this.getUserActual())
  }


  public isLogged(): boolean {
    return !!this.svrToken.token && !this.svrToken.jwtTokenExp();
  }


  private doLogout() {
    if (this.svrToken.token) {
      this.svrToken.eliminarToken();
    }
    this.usrActualSubject.next(this.getUserActual())
  }


  private getUserActual(): User {
    if (!this.svrToken.token) {
      return new User();
    }
    const tokenD = this.svrToken.decodeToken();
    console.log(tokenD);
    return { usr: tokenD.sub, rol: tokenD.rol, nom: tokenD.nom }
  }


  public verificarRefrescar(): boolean {
    if (this.isLogged() && this.svrToken.tiempoExpToken() <= 20) {
      this.svrToken.refreshTokens();
      return true;
    } else {
      return false;
    }
  }
}




// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor() { }
// }



// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { BehaviorSubject, catchError, map, Observable, of, retry, tap } from 'rxjs';
// //import { map, catchError } from "rxjs/operators";
// import { environment } from 'src/environments/environment';
// import { Token } from '../models/token';
// import { User } from '../models/user';
// import { TokenService } from './token.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   private usrActualSubject = new BehaviorSubject<User>(new User);
//   public usrActual = this.usrActualSubject.asObservable();

//   constructor(
//     private srvToken : TokenService,
//     private http : HttpClient,
//     private router : Router
//     ) { }

//     public get valorUsrActual () : User {
//       return this.usrActualSubject.value;
//     }

//   public login(user : [usr:'', passw:'']) : Observable<any>{
//     return this.http.post<Token>(`${environment.SRV}/auth/iniciar`, user)
//     .pipe(
//       retry(1),
//       tap(
//         tokens => {
//           this.doLogin(tokens);
//           console.log(tokens);
//           //window.location.reload();
//           this.router.navigate(['/home']);
//         }
//       ),
//       map(() => true),
//       catchError(
//         error => {return of (error.status + "No te has logeado")}
//       )
//     )
//   }

//   public logout(){
//     this.http.patch(`${environment.SRV}/auth/cerrar`,{
//       "idUsuario" : this.valorUsrActual.usr
//     })
//     .subscribe();
//     this.doLogout()
//   }

//   private doLogin(tokens : Token) : void {
//     this.srvToken.setTokens(tokens);
//     this.usrActualSubject.next(this.getUserActual());
//   }
//   private doLogout(){
//     if (this.srvToken.token) {
//       this.srvToken.eliminarTokens();
//     }
//     this.usrActualSubject.next(this.getUserActual());
//   }
//   public isLogged() : boolean {
//     return !!this.srvToken.token && !this.srvToken.jtwTokenExp();
//   }
//   private getUserActual() : User {
//     if (!this.srvToken.token) {
//       return new User(); //{usr:'', rol:-1, nom:''}
//     }
//     const tokenD  = this.srvToken.decodeToken();
//     console.log(tokenD);
//     return {usr: tokenD.sub, rol:tokenD.rol, nom:tokenD.nom}
//   }

//   public verificarRefrescar() : boolean{
//     if (this.isLogged() && this.srvToken.tiempoExpToken() <= 20) {
//       this.srvToken.refreshTokens();
//       return true;
//     } else {
//       return false;
//     }
//   }
  

// }
