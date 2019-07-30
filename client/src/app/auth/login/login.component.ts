import { Component, OnInit } from '@angular/core';
import { UserauthService } from 'src/app/services/userauth.service';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private serviceAuth: UserauthService,private route: Router) {
    this.loginData = this.formGroupCreator();
  }
  
  token = '';
  

  loginData: FormGroup;

  formGroupCreator(): FormGroup {
    return new FormGroup({
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    });
  }

  get email(){
    return this.loginData.get('email');
  }

  get password(){
    return this.loginData.get('password');
  }

  ngOnInit() {
  }

  login():void{
    if(this.loginData.valid){
      //verificar token
      if( this.token == ''){
        Swal.fire(
          'Error!',
          'Debe verificar que no es un robot',
          'error');
        return;
      }
      let email = this.loginData.get('email').value;
      let password = this.loginData.get('password').value;
      this.serviceAuth.loginUser(email,password).subscribe(item => {
        this.serviceAuth.saveToken(item.id);
        this.serviceAuth.saveUserInformation(item.user);
        this.route.navigate(['/']);
      },(error)=>{
        Swal.fire(
          'Error!',
          'Las credenciales ingresadas no son correctas',
          'error');
      });
    }else{
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
