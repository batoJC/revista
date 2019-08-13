import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserauthService } from 'src/app/services/userauth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AssessorService } from 'src/app/services/assessor.service';
import { AssessorModel } from 'src/app/models/assessor.model';
import { UserModel } from 'src/app/models/user.model';
import Swal from 'sweetalert2';

declare const iniciarSelect: any;
declare const openModal: any;
declare const closeModal: any;
declare const activeLabels: any;
declare const disableLabels: any;

@Component({
  selector: 'app-assesors',
  templateUrl: './assesors.component.html',
  styleUrls: ['./assesors.component.css']
})
export class AssesorsComponent implements OnInit {

  token: string = '';
  infoUser: UserModel;
  assessorData: FormGroup;

  constructor(private assessorService: AssessorService, private userService: UserService, private spinner: NgxSpinnerService, private authService: UserauthService) {
    this.token = authService.getToken();
    this.infoUser = this.authService.getUserInformation();
    this.assessorData = this.formGroupCreator();
    this.loadAssessorData();
  }

  formGroupCreator(): FormGroup {
    return new FormGroup({
      id: new FormControl(null, []),
      first_name: new FormControl('', [Validators.required]),
      second_name: new FormControl(''),
      first_last_name: new FormControl('', [Validators.required]),
      second_last_name: new FormControl(''),
      country: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      level_education: new FormControl('', [Validators.required]),
      specialty: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
    });
  }

  listAssessors: AssessorModel[] = [];

  openModalAdd(){
    disableLabels();
    this.assessorData =  this.formGroupCreator();
    this.option = 'add';
    openModal('modalAssessor','Agregar Evaluador');
    setTimeout(()=>{
      iniciarSelect();
    }, 1000);
  }

  closeModal() {
    closeModal('modalAssessor');
  }

  get id() {
    return this.assessorData.get('id');
  }

  get first_name() {
    return this.assessorData.get('first_name');
  }

  get second_name() {
    return this.assessorData.get('second_name');
  }

  get first_last_name() {
    return this.assessorData.get('first_last_name');
  }

  get second_last_name() {
    return this.assessorData.get('second_last_name');
  }

  get country() {
    return this.assessorData.get('country');
  }

  get phone() {
    return this.assessorData.get('phone');
  }

  get level_education() {
    return this.assessorData.get('level_education');
  }

  get specialty() {
    return this .assessorData.get('specialty');
  }

  get email() {
    return this.assessorData.get('email');
  }
      

  ngOnInit() {
    iniciarSelect();
  }

  //variables para manejar el modal agregar y editar
  option = 'add';
  dataUser: UserModel = null;
  dataAssessor: AssessorModel = null;


  register(): void {
    if (this.assessorData.valid) {
      if (this.option == 'add') {
        console.log('oe add');
        this.spinner.show();
        let dataUser: UserModel = {
          id: null,
          realm: '',
          username: `${this.assessorData.get('first_name').value} ${this.assessorData.get('first_last_name').value}`,
          email: this.assessorData.get('email').value,
          password: '12345678',
          rol: 3,
          user: null
        };

        let dataAssessor: AssessorModel = {
          first_name: this.assessorData.get('first_name').value,
          second_name: this.assessorData.get('second_name').value,
          first_last_name: this.assessorData.get('first_last_name').value,
          second_last_name: this.assessorData.get('second_last_name').value,
          country: this.assessorData.get('country').value,
          phone: this.assessorData.get('phone').value,
          level_education: this.assessorData.get('level_education').value,
          specialty: this.assessorData.get('specialty').value,
          user_id: '',
          author_id: this.infoUser.id,
          // state: 'pendiente de respuesta',
          state: 'evaluador',
          id: null,
          user: null
        };

        this.userService.createNew(dataUser).subscribe(item => {
          dataAssessor.user_id = item.id;
          this.assessorService.createNew(dataAssessor).subscribe(item => {
            this.spinner.hide();
            Swal.fire('Logrado!',
              'Se ha registrado Correctamente el evaluador',
              'success').then(() => {
                this.assessorData = this.formGroupCreator();
                this.closeModal();
                this.loadAssessorData();
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

        this.dataUser.username = `${this.assessorData.get('first_name').value} ${this.assessorData.get('first_last_name').value}`;
        this.dataUser.email = this.assessorData.get('email').value;


        this.dataAssessor.first_name = this.assessorData.get('first_name').value;
        this.dataAssessor.second_name = this.assessorData.get('second_name').value;
        this.dataAssessor.first_last_name = this.assessorData.get('first_last_name').value;
        this.dataAssessor.second_last_name = this.assessorData.get('second_last_name').value;
        this.dataAssessor.country = this.assessorData.get('country').value;
        this.dataAssessor.phone = this.assessorData.get('phone').value;
        this.dataAssessor.level_education = this.assessorData.get('level_education').value;
        this.dataAssessor.specialty = this.assessorData.get('specialty').value;

        this.userService.updateUser(this.dataUser, this.token).subscribe((item) => {
          this.assessorService.updateAssessor(this.dataAssessor).subscribe(item => {
            this.spinner.hide();
            Swal.fire('Logrado!',
              'Se ha editado Correctamente el registro',
              'success').then(() => {
                this.assessorData = this.formGroupCreator();
                this.closeModal();
                this.loadAssessorData();
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

  loadAssessorData() {
    this.spinner.show();
    this.assessorService.loadAssessors().subscribe((item) => {
      this.listAssessors = item;
      this.spinner.hide();
    }, (err) => {
      this.spinner.hide();
      Swal.fire({
        title: 'Error!', 
        text: 'Ocurrió un error al cargar los registros,¿Desea intentar de nuevo?', 
        type : 'error',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
      }).then((res)=>{
        if(res){
          this.loadAssessorData();
        }
      });
    });
  }

  loadData(assessor) {
    this.userService.findUser(assessor.user_id, this.token).subscribe((item) => {
      this.dataAssessor = assessor;
      this.dataUser = item;
      this.assessorData = new FormGroup({
        id: new FormControl(this.dataAssessor.id, []),
        first_name: new FormControl(this.dataAssessor.first_name, [Validators.required]),
        second_name: new FormControl(this.dataAssessor.second_name),
        first_last_name: new FormControl(this.dataAssessor.first_last_name, [Validators.required]),
        second_last_name: new FormControl(this.dataAssessor.second_name),
        country: new FormControl(this.dataAssessor.country, [Validators.required]),
        phone: new FormControl(this.dataAssessor.phone, [Validators.required]),
        email: new FormControl(this.dataUser.email, [Validators.required]),
        level_education: new FormControl(this.dataAssessor.level_education, [Validators.required]),
        specialty: new FormControl(this.dataAssessor.specialty, [Validators.required])
      });
      activeLabels();
      this.option = 'edit';
      openModal('modalAssessor', 'Editar Evaluador');
      setTimeout(() => {
        iniciarSelect();
      }, 500);
    });
  }

  deleteAssessor(assessor){
    Swal.fire({
      title: 'Advertencia!',
      text: '¿Seguro de que desea eliminar este registro?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((res)=>{
      if(res.value){
        this.spinner.show();
        this.userService.deleteUser(assessor.user_id).subscribe(()=>{
          this.assessorService.deleteAssessor(assessor.id).subscribe(()=>{
            this.spinner.hide();
            this.loadAssessorData();
            Swal.fire('Logrado!','Se elimino el registro correctamente','success');
          });
        });
      }
    });
  }

}
