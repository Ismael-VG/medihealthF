import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PasswService } from 'src/app/shared/services/passw.service';

@Component({
  selector: 'app-change-passw',
  templateUrl: './change-passw.component.html',
  styleUrls: ['./change-passw.component.css']
})
export class ChangePasswComponent {
  frmPassw : FormGroup;
  guardado : boolean = false;
  constructor(
    private fb : FormBuilder,
    private passwSrv : PasswService,
    private authSrv : AuthService,
    private router : Router
  ) { 

    this.frmPassw = this.fb.group({
      passw : ['', Validators.required],
      passwN : ['', Validators.required],
      passwR : ['', Validators.required],
    }, 
    {validators : [this.checkPassw]});
  }

  checkPassw : ValidatorFn = (control : AbstractControl) : ValidationErrors | null => {
    const passwN = control.get("passwN");
    const passwR = control.get("passwR");
    return passwN && passwR && passwN.value !== passwR.value ? { coincide : true } : null;
  }


  onSubmit(){
    console.log(this.authSrv.valorUsrActual.usr)
    this.passwSrv.cambioPassw({
      idUsuario: this.authSrv.valorUsrActual.usr,
      passw : this.C.value.passw,
      passwN : this.C.value.passwN
    })
    .subscribe({
      complete : () => {

        this.guardado = true;
        setTimeout(()=>{
          this.guardado = false;
          this.onCerrar();
        }, 3000);
      },
      error : (e) => {
        if (e.status === 401) {
          this.C.controls["passw"].setErrors({invalid:true})
        }
      }
    })
  }

  get C (){
    return this.frmPassw;
  }

  onCerrar(){
    this.router.navigate(["/dashboard"]);
  }

  ngOnInit(): void {
  }

}
