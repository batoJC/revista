import { Component, OnInit } from '@angular/core';
import { PublishingService } from 'src/app/services/publishing.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserauthService } from 'src/app/services/userauth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PublishingModel } from 'src/app/models/publishing.model';
import Swal from 'sweetalert2';

declare const iniciarDatapicker: any;
declare const openModal: any;
declare const closeModal: any;
declare const activeLabels: any;
declare const disableLabels: any;
declare const getDato: any;

@Component({
  selector: 'app-publishing',
  templateUrl: './publishing.component.html',
  styleUrls: ['./publishing.component.css']
})
export class PublishingComponent implements OnInit {

  token: string = ''

  dato = '';

  constructor(private publishingService: PublishingService, private spinner: NgxSpinnerService, private authService: UserauthService) {
    this.token = authService.getToken();
    this.publishingData = this.formGroupCreator();
    this.loadPublishingsData();
    setTimeout(()=>{
      iniciarDatapicker();
    },1000);
  }

  publishingData: FormGroup;

  formGroupCreator(): FormGroup {
    return new FormGroup({
      id: new FormControl(null, []),
      name: new FormControl('', [Validators.required]),
      level: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      max_date: new FormControl('', [])
    });
  }

  listPublishings: PublishingModel[] = [];

  openModalAdd() {
    disableLabels();
    this.publishingData = this.formGroupCreator();
    this.option = 'add';
    openModal('modalPublishing', 'Agregar Edición');
  }

  closeModal() {
    closeModal('modalPublishing');
  }

  get id() {
    return this.publishingData.get('id');
  }

  get name() {
    return this.publishingData.get('name');
  }

  get level() {
    return this.publishingData.get('level');
  }

  get description() {
    return this.publishingData.get('description');
  }

  get max_date() {
    return this.publishingData.get('max_date');
  }

  ngOnInit() {
  }

  //variables para manejar el modal agregar y editar
  option = 'add';
  dataPublishing: PublishingModel = null;

  register(): void {
    let fecha = getDato('max_date');
    if (this.publishingData.valid && fecha != '') {
      if (this.option == 'add') {
        console.log('oe add');
        this.spinner.show();

        let dataPublishing: PublishingModel = {
          name: this.publishingData.get('name').value,
          level: this.publishingData.get('level').value,
          description: this.publishingData.get('description').value,
          max_date: fecha,
          state: true,
          id: null
        };

        this.publishingService.setState().subscribe((item)=>{
          this.publishingService.createNew(dataPublishing).subscribe(item => {
            this.spinner.hide();
            Swal.fire('Logrado!',
              'Se ha registrado Correctamente la publicación',
              'success').then(() => {
                this.publishingData = this.formGroupCreator();
                this.closeModal();
                this.loadPublishingsData();
              });
          }, (err) => {
            this.spinner.hide();
            Swal.fire('Error!', 'Ocurrió un error al realizar el registro', 'error');
          });
        });
        
      }


      if (this.option == 'edit') {
        console.log('oe edit');

        this.spinner.show();


        this.dataPublishing.name = this.publishingData.get('name').value;
        this.dataPublishing.level = this.publishingData.get('level').value;
        this.dataPublishing.description = this.publishingData.get('description').value;
        this.dataPublishing.max_date = this.publishingData.get('max_date').value;

        this.publishingService.updatePublishing(this.dataPublishing).subscribe(item => {
          this.spinner.hide();
          Swal.fire('Logrado!',
            'Se ha editado Correctamente el registro',
            'success').then(() => {
              this.publishingData = this.formGroupCreator();
              this.closeModal();
              this.loadPublishingsData();
            });
        }, (err) => {
          this.spinner.hide();
          Swal.fire('Error!', 'Ocurrió un error al editar el registro', 'error');
        });
      }
    } else {
      Swal.fire('Error!', 'Debe de completar todos los datos correctamente', 'error');
    }

  }

  loadPublishingsData() {
    this.spinner.show();
    this.publishingService.loadPublishings().subscribe((item) => {
      this.listPublishings = item;
      this.spinner.hide();
    });
  }

  loadData(publishing) {
    this.dataPublishing = publishing;
    this.publishingData = new FormGroup({
      id: new FormControl(this.dataPublishing.id, []),
      name: new FormControl(this.dataPublishing.name, [Validators.required]),
      level: new FormControl(this.dataPublishing.level),
      description: new FormControl(this.dataPublishing.description, [Validators.required]),
      max_date: new FormControl(this.dataPublishing.max_date)
    });
    activeLabels();
    this.option = 'edit';
    openModal('modalPublishing', 'Editar Edición');
  }


  deletePublishing(publishing) {
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
        this.publishingService.deletePublishing(publishing.id).subscribe(() => {
          this.spinner.hide();
          this.loadPublishingsData();
          Swal.fire('Logrado!', 'Se elimino el registro correctamente', 'success');
        });
      }
    });
  }

}
