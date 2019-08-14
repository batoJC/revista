import { Component, OnInit } from '@angular/core';
import { AuthorModel } from 'src/app/models/author.model';
import { AuthorService } from 'src/app/services/author.service';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmailService } from 'src/app/services/email.service';
import * as CryptoJS from 'crypto-js';


declare const iniciarSelect: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authorService: AuthorService, private userService: UserService, private router: Router, private spinner: NgxSpinnerService, private emailService: EmailService) {
    this.registerData = this.formGroupCreator();
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  token: string = '';

  registerData: FormGroup;

  formGroupCreator(): FormGroup {
    return new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      second_name: new FormControl(''),
      first_last_name: new FormControl('', [Validators.required]),
      second_last_name: new FormControl(''),
      country: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      afilation: new FormControl('', [Validators.required]),
      level_education: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]),
    });
  }

  get first_name() {
    return this.registerData.get('first_name');
  }

  get second_name() {
    return this.registerData.get('second_name');
  }

  get first_last_name() {
    return this.registerData.get('first_last_name');
  }

  get second_last_name() {
    return this.registerData.get('second_last_name');
  }

  get country() {
    return this.registerData.get('country');
  }

  get phone() {
    return this.registerData.get('phone');
  }

  get email() {
    return this.registerData.get('email');
  }

  get afilation() {
    return this.registerData.get('afilation');
  }

  get level_education() {
    return this.registerData.get('level_education');
  }

  get password() {
    return this.registerData.get('password');
  }



  ngOnInit() {
    iniciarSelect();
  }


  register(): void {

    // let hash = CryptoJS.AES.encrypt( this.registerData.get('password').value + (Math.random() * (4000000 - 0) + 0), 'jkasbdjabsjbdkjsad').toString().replace('///g','#').replace('/+/g','#');
    // console.log(hash);
    // return;


    if (this.registerData.valid) {
      //verificar token
      if (this.token == '') {
        Swal.fire(
          'Error!',
          'Debe verificar que no es un robot',
          'error');
        return;
      }
      this.spinner.show();
      let dataUser: UserModel = {
        id: null,
        realm: '',
        username: `${this.registerData.get('first_name').value} ${this.registerData.get('first_last_name').value}`,
        email: this.registerData.get('email').value,
        password: this.registerData.get('password').value,
        rol: 1,
        user: null
      };

      //generar hash
      let hash = CryptoJS.SHA256( this.registerData.get('password').value + (Math.random() * (4000000 - 0) + 0), '12hjb2j1hb21hj3hj213').toString();

      let dataAuthor: AuthorModel = {
        first_name: this.registerData.get('first_name').value,
        second_name: this.registerData.get('second_name').value,
        first_last_name: this.registerData.get('first_last_name').value,
        second_last_name: this.registerData.get('second_last_name').value,
        country: this.registerData.get('country').value,
        phone: this.registerData.get('phone').value,
        level_education: this.registerData.get('level_education').value,
        afilation: this.registerData.get('afilation').value,
        user_id: '',
        state: 'por confirmar',
        hash: hash,
        id: null,
        user: null
      };

      this.userService.createNew(dataUser).subscribe(item => {
        dataAuthor.user_id = item.id;
        this.authorService.createNew(dataAuthor).subscribe(item => {
          //enviar email para que verifique el correo
          this.emailService.sendEmail(`Bienvenido al Sistema de nuestra revista<br>Para confirmar su correo electronico haga click en el siguiente enlace <a href="http://localhost:4200/confirm/${hash}" >Confirmar Dirrección de correo electrónico</a>`, 'Confirmar mi correo', dataUser.email).subscribe((item) => {
            this.spinner.hide();
            Swal.fire('Logrado!',
              'Se ha registrado Correctamente, por favor confirme su correo electronico para iniciar sesión',
              'success').then(() => {
                this.router.navigate(['/']);
              });
          });
        }, (err) => {
          this.spinner.hide();
          Swal.fire('Error!', 'Ocurrió un error al realizar el registro', 'error');
        });
      }, (erro) => {
        this.spinner.hide();
        console.log(erro);
        Swal.fire('Error!', 'Ocurrió un error al realizar el registro', 'error');
      });
    } else {
      Swal.fire('Error!', 'Debe de completar todos los datos correctamente', 'error');
    }
  }


  resolved(captchaResponse: string) {
    this.token = captchaResponse;
  }


}
