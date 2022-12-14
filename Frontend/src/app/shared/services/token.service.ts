import { Token } from '../models/token';
import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private JWT_TOKEN = 'JWT_TOKEN';
  private REFRESH_TOKEN = 'REFRESH_TOKEN';
  private refrescando: boolean = false;
  constructor(
    private http: HttpClient
  ) { }

  setTokens(tokens: Token): void {
    this.setToken(tokens.token);
    this.setRefreshToken(tokens.refreshToken);
  }
  private setToken(token: string): void {
    localStorage.setItem(this.JWT_TOKEN, token);
  }
  private setRefreshToken(token: string): void {
    localStorage.setItem(this.REFRESH_TOKEN, token);
  }
  get token() {
    return localStorage.getItem(this.JWT_TOKEN)!;
  }
  get refreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN)!;
  }
  eliminarToken() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
  public decodeToken(): any {
    const helper = new JwtHelperService();
    return helper.decodeToken(this.token);
  }
  public jwtTokenExp(): boolean {
    const helper = new JwtHelperService();
    return helper.isTokenExpired(this.token);
  }
  public tiempoExpToken(): any {
    return this.decodeToken().exp - (Date.now() / 1000);
  }
  public refreshTokens() {
    if (!this.refrescando) {
      this.refrescando = true;
      this.http.patch<Token>(`${environment.SVR}/auth/refrescar`, { idUsuario: this.decodeToken().sub, tkR: this.refreshToken })
        .subscribe(
          tokens => {
            console.log(tokens)
            this.setTokens(tokens);
            this.refrescando = false;
          }
        )
    }
  }
}










// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class TokenService {

//   constructor() { }
// }

// import { Injectable } from '@angular/core';
// import { Token } from '../models/token';
// import { JwtHelperService } from "@auth0/angular-jwt";
// import { HttpClient } from '@angular/common/http';
// import { environment } from 'src/environments/environment';

// @Injectable({
//   providedIn: 'root'
// })
// export class TokenService {
//   private JWT_TOKEN = 'JWT_TOKEN';
//   private REFRESH_TOKEN = 'REFRESH_TOKEN';
//   private refrescando : boolean = false;
//   constructor(
//     private http : HttpClient
//   ) { }
//   setTokens(tokens : Token) : void{
//     this.setToken(tokens.token);
//     this.setRefreshToken(tokens.refreshToken);
//   }

//   private setToken(token : string) : void {
//     localStorage.setItem(this.JWT_TOKEN, token);
//   }

//   private setRefreshToken(token : string) : void {
//     localStorage.setItem(this.REFRESH_TOKEN, token);
//   }

//   get token() : string {
//     return localStorage.getItem(this.JWT_TOKEN)!;
//   }

//   get refreshToken() : string {
//     return localStorage.getItem(this.refreshToken)!;
//   }

//   eliminarTokens() {
//     localStorage.removeItem(this.JWT_TOKEN);
//     localStorage.removeItem(this.REFRESH_TOKEN);
//   }

//   public decodeToken() : any {
//     const helper = new JwtHelperService();
//     return helper.decodeToken(this.token);
//   }

//   public jtwTokenExp() : boolean {
//     const helper = new JwtHelperService();
//     return helper.isTokenExpired(this.token);
//   }

//   public tiempoExpToken() : any {
//     return this.decodeToken().exp - (Date.now() / 1000);
//   }

//   public refreshTokens(){

//     if (!this.refrescando) {
//       this.refrescando = true;
//       this.http.patch<Token>(`${environment.SRV}/auth/refrescar`,
//       {idUsuario : this.decodeToken().sub, tkR : this.refreshToken})
//       .subscribe(
//         tokens => {
//           this.setTokens(tokens);
//           this.refrescando = false;
//         }
//       )
//     }

//   }
// }
