import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  errorLogin : boolean = false;
  loading = false;
  constructor(
    private fb: FormBuilder,
    private authSrv : AuthService,
    private _snackBar: MatSnackBar, 
    private router: Router
    ) {
    this.form = this.fb.group({
      idUsuario: ['', Validators.required],
      passw:['', Validators.required]
    })
  }


  onSubmit() {
    console.log(this.form.value);
    this.authSrv.login(this.form.value).subscribe({
      complete : () => {
          this.errorLogin = true;
          // console.log("complete");
          //this.fakeLoading();
      }
    })
    // console.log(this.errorLogin);
  }

  ngOnInit(): void {
  }

  volver(){
    this.router.navigate(['']);
  }


  fakeLoading() {
    this.loading = true;
    setTimeout(() => {
      
      this.router.navigate(['dashboard']);

    }, 1500)
  }

  error(){
    this._snackBar.open('Credenciales invalidos', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
  }

}
