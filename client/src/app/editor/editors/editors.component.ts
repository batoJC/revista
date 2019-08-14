import { Component, OnInit } from '@angular/core';
import { EditorService } from 'src/app/services/editor.service';
import { UserService } from 'src/app/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserModel } from 'src/app/models/user.model';
import { EditorModel } from 'src/app/models/editor.model';
import { UserauthService } from 'src/app/services/userauth.service';
import * as CryptoJS from 'crypto-js';
import { EmailService } from 'src/app/services/email.service';


declare const iniciarSelect: any;
declare const openModal: any;
declare const closeModal: any;
declare const activeLabels: any;
declare const disableLabels: any;


@Component({
  selector: 'app-editors',
  templateUrl: './editors.component.html',
  styleUrls: ['./editors.component.css']
})
export class EditorsComponent implements OnInit {

  token: string = ''

  constructor(private editorService: EditorService, private userService: UserService, private spinner: NgxSpinnerService, private authService: UserauthService, private emailService: EmailService) {
    this.token = authService.getToken();
    this.editorData = this.formGroupCreator();
    this.loadEditorsData();
  }

  editorData: FormGroup;

  formGroupCreator(): FormGroup {
    return new FormGroup({
      id: new FormControl(null, []),
      first_name: new FormControl('', [Validators.required]),
      second_name: new FormControl(''),
      first_last_name: new FormControl('', [Validators.required]),
      second_last_name: new FormControl(''),
      country: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      level_education: new FormControl('', [Validators.required]),
    });
  }

  listEditors: EditorModel[] = [];

  openModalAdd() {
    disableLabels();
    this.editorData = this.formGroupCreator();
    this.option = 'add';
    openModal('modalEditor', 'Agregar Editor');
    setTimeout(() => {
      iniciarSelect();
    }, 1000);
  }

  closeModal() {
    closeModal('modalEditor');
  }

  get id() {
    return this.editorData.get('id');
  }

  get first_name() {
    return this.editorData.get('first_name');
  }

  get second_name() {
    return this.editorData.get('second_name');
  }

  get first_last_name() {
    return this.editorData.get('first_last_name');
  }

  get second_last_name() {
    return this.editorData.get('second_last_name');
  }

  get country() {
    return this.editorData.get('country');
  }

  get phone() {
    return this.editorData.get('phone');
  }

  get email() {
    return this.editorData.get('email');
  }

  get level_education() {
    return this.editorData.get('level_education');
  }


  ngOnInit() {
    iniciarSelect();
  }

  //variables para manejar el modal agregar y editar
  option = 'add';
  dataUser: UserModel = null;
  dataEditor: EditorModel = null;

  register(): void {
    if (this.editorData.valid) {
      if (this.option == 'add') {
        let pass = CryptoJS.SHA256('' + (Math.random() * (4000000 - 0) + 0), '12hjb2j1hb21hj3hj213').toString().substr(0, 10);
        this.spinner.show();
        let dataUser: UserModel = {
          id: null,
          realm: '',
          username: `${this.editorData.get('first_name').value} ${this.editorData.get('first_last_name').value}`,
          email: this.editorData.get('email').value,
          password: pass,
          rol: 2,
          user: null
        };

        let dataEditor: EditorModel = {
          first_name: this.editorData.get('first_name').value,
          second_name: this.editorData.get('second_name').value,
          first_last_name: this.editorData.get('first_last_name').value,
          second_last_name: this.editorData.get('second_last_name').value,
          country: this.editorData.get('country').value,
          phone: this.editorData.get('phone').value,
          level_education: this.editorData.get('level_education').value,
          user_id: '',
          id: null,
          user: null
        };

        this.userService.createNew(dataUser).subscribe(item => {
          dataEditor.user_id = item.id;
          this.editorService.createNew(dataEditor).subscribe(edit => {
            this.emailService.sendEmail(`Ha sido agregado como editor en el sistema de nuestra revista por gavor siga el enlace e inicie sesión con su correo electronico y la siguiente contraseña.<br>contraseña:${pass}`, 'Nuevo usuario', item.email).subscribe(() => {
              this.spinner.hide();
              Swal.fire('Logrado!',
                'Se ha registrado Correctamente el editor',
                'success').then(() => {
                  this.editorData = this.formGroupCreator();
                  this.closeModal();
                  this.loadEditorsData();
                });
            });
          }, (err) => {
            this.spinner.hide();
            Swal.fire('Error!', 'Ocurrió un error al realizar el registro', 'error');
          });
        }, (err) => {
          this.spinner.hide();
          Swal.fire('Error!', 'Ocurrió un error al realizar el registro', 'error');
        });
      }


      if (this.option == 'edit') {
        console.log('oe edit');

        this.spinner.show();

        this.dataUser.username = `${this.editorData.get('first_name').value} ${this.editorData.get('first_last_name').value}`;
        this.dataUser.email = this.editorData.get('email').value;


        this.dataEditor.first_name = this.editorData.get('first_name').value;
        this.dataEditor.second_name = this.editorData.get('second_name').value;
        this.dataEditor.first_last_name = this.editorData.get('first_last_name').value;
        this.dataEditor.second_last_name = this.editorData.get('second_last_name').value;
        this.dataEditor.country = this.editorData.get('country').value;
        this.dataEditor.phone = this.editorData.get('phone').value;
        this.dataEditor.level_education = this.editorData.get('level_education').value;

        this.userService.updateUser(this.dataUser, this.token).subscribe((item) => {
          this.editorService.updateEditor(this.dataEditor).subscribe(item => {
            this.spinner.hide();
            Swal.fire('Logrado!',
              'Se ha editado Correctamente el registro',
              'success').then(() => {
                this.editorData = this.formGroupCreator();
                this.closeModal();
                this.loadEditorsData();
              });
          }, (err) => {
            this.spinner.hide();
            Swal.fire('Error!', 'Ocurrió un error al editar el registro', 'error');
          });
        }, (err) => {
          this.spinner.hide();
          Swal.fire('Error!', 'Ocurrió un error al realizar el registro', 'error');
        });
      }
    } else {
      Swal.fire('Error!', 'Debe de completar todos los datos correctamente', 'error');
    }

  }

  loadEditorsData() {
    this.spinner.show();
    this.editorService.loadEditors().subscribe((item) => {
      this.listEditors = item;
      this.spinner.hide();
    }, (err) => {
      this.spinner.hide();
      Swal.fire({
        title: 'Error!',
        text: 'Ocurrió un error al cargar los registros,¿Desea intentar de nuevo?',
        type: 'error',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
      }).then((res) => {
        if (res) {
          this.loadEditorsData();
        }
      });
    });
  }

  loadData(editor) {
    this.userService.findUser(editor.user_id, this.token).subscribe((item) => {
      this.dataEditor = editor;
      this.dataUser = item;
      this.editorData = new FormGroup({
        id: new FormControl(this.dataEditor.id, []),
        first_name: new FormControl(this.dataEditor.first_name, [Validators.required]),
        second_name: new FormControl(this.dataEditor.second_name),
        first_last_name: new FormControl(this.dataEditor.first_last_name, [Validators.required]),
        second_last_name: new FormControl(this.dataEditor.second_name),
        country: new FormControl(this.dataEditor.country, [Validators.required]),
        phone: new FormControl(this.dataEditor.phone, [Validators.required]),
        email: new FormControl(this.dataUser.email, [Validators.required]),
        level_education: new FormControl(this.dataEditor.level_education, [Validators.required])
      });
      activeLabels();
      this.option = 'edit';
      openModal('modalEditor', 'Editar Editor');
      setTimeout(() => {
        iniciarSelect();
      }, 500);
    });
  }


  deleteEditor(editor) {
    Swal.fire({
      title: 'Advertencia!',
      text: '¿Seguro de que desea eliminar este registro?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((res) => {
      if (res.value) {
        this.spinner.show();
        this.userService.deleteUser(editor.user_id).subscribe(() => {
          this.editorService.deleteEditor(editor.id).subscribe(() => {
            this.spinner.hide();
            this.loadEditorsData();
            Swal.fire('Logrado!', 'Se elimino el registro correctamente', 'success');
          });
        });
      }
    });
  }


}
