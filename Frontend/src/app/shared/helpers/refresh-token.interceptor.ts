import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request);
  }
}




// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor
// } from '@angular/common/http';
// import { finalize, Observable } from 'rxjs';
// import { AuthService } from '../services/auth.service';

// @Injectable()
// export class RefreshTokenInterceptor implements HttpInterceptor {

//   constructor(
//     private authSrv : AuthService
//   ) {}

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     return next.handle(request)
//     .pipe(
//       finalize(
//         () => {
//           this.authSrv.verificarRefrescar();
//         }
//       )
//     )
//   }
// }
