import { Component, OnInit } from '@angular/core';
import { UserauthService } from 'src/app/services/userauth.service';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthorService } from 'src/app/services/author.service';
import { AssessorService } from 'src/app/services/assessor.service';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private serviceAuth: UserauthService, private route: Router, private spinner: NgxSpinnerService, private authorService: AuthorService,private assessorService: AssessorService) {
    this.loginData = this.formGroupCreator();
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  token = '';


  loginData: FormGroup;

  formGroupCreator(): FormGroup {
    return new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  get email() {
    return this.loginData.get('email');
  }

  get password() {
    return this.loginData.get('password');
  }

  ngOnInit() {
  }

  login(): void {
    if (this.loginData.valid) {
      //verificar token
      if (this.token == '') {
        Swal.fire(
          'Error!',
          'Debe verificar que no es un robot',
          'error');
        return;
      }
      this.spinner.show();
      let email = this.loginData.get('email').value;
      let password = CryptoJS.SHA256(this.loginData.get('password').value).toString();
      this.serviceAuth.loginUser(email, password).subscribe(auth => {
        //verificar que el usuario ya tenga confirmado su email
        switch (auth.user.rol) {
          case 1:
            this.authorService.findByUserId(auth.user.id).subscribe((item) => {
              console.log(item);
              if (item[0].state == 'Confirmado') {
                this.serviceAuth.saveToken(auth.id);
                this.serviceAuth.saveUserInformation(auth.user);
                this.route.navigate(['/']);
                this.spinner.hide();
              } else {
                this.spinner.hide();
                Swal.fire('Error!', 'Primero debe de confirmar su correo electrónico', 'error');
              }
            });
            break;
          case 2:
            this.serviceAuth.saveToken(auth.id);
            this.serviceAuth.saveUserInformation(auth.user);
            this.route.navigate(['/']);
            this.spinner.hide();
            break;
          case 3:
            this.assessorService.findByIdUser(auth.user.id).subscribe((item)=>{
              console.log(item);
              if (item[0].state == 'evaluador') {
                this.serviceAuth.saveToken(auth.id);
                this.serviceAuth.saveUserInformation(auth.user);
                this.route.navigate(['/']);
                this.spinner.hide();
              } else if(item[0].state == 'cancelado'){
                this.spinner.hide();
                Swal.fire('Error!', 'Usted rechazo la participación en la revista', 'error');
              }else{
                this.spinner.hide();
                Swal.fire('Error!', 'Primero debe de confirmar su participación en la revista', 'error');
              }
            });
            break;
        }


      }, (error) => {
        this.spinner.hide();
        Swal.fire(
          'Error!',
          'Las credenciales ingresadas no son correctas',
          'error');
      });
    } else {
      Swal.fire(
        'Error!',
        'Por favor verifica que todos los campos sean correctos',
        'error');
    }
  }



  resolved(captchaResponse: string) {
    this.token = captchaResponse;
  }


}
