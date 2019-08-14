import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { ArticleModel } from 'src/app/models/article.model';
import { UserauthService } from 'src/app/services/userauth.service';
import { UserModel } from 'src/app/models/user.model';
import { PublishingModel } from 'src/app/models/publishing.model';
import { PublishingService } from 'src/app/services/publishing.service';
import { ArticleService } from 'src/app/services/article.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { FilesService } from 'src/app/services/files.service';
import { isNullOrUndefined } from 'util';
import { AuthorModel } from 'src/app/models/author.model';
import { AuthorService } from 'src/app/services/author.service';
import { EditorService } from 'src/app/services/editor.service';
import { EmailService } from 'src/app/services/email.service';
import { UserService } from 'src/app/services/user.service';

declare const updateTextaeras: any;
declare const disableLabels: any;
declare const activeLabels: any;
declare const openModal: any;
declare const closeModal: any;
declare const getPdfById: any;



@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  constructor(private authService: UserauthService, private publishingService: PublishingService, private articleService: ArticleService, private router: Router, private spinner: NgxSpinnerService, private rutaActiva: ActivatedRoute, private fileService: FilesService, private autorService: AuthorService, private userService:UserService, private emailService: EmailService) {
  }

  informationArticle: ArticleModel;

  infoAuthor: AuthorModel;

  ngOnInit() {
    // updateTextaeras();
    this.user = this.authService.getUserInformation();
    this.publishingService.getActive().subscribe((item) => {
      this.publishing = item;
    });
    this.autorService.findByUserId(this.user.id).subscribe((item) => {
      this.infoAuthor = item[0];
    });

    this.spinner.show();
    let idArticle = this.getUrlParameter('id');
    this.articleData = this.formGroupCreator();
    if (idArticle == null) {
      this.action = 'add';
    } else {
      this.action = 'edit';
      this.texto = 'Si desea cambiar el archivo cargado anteriormente seleccione uno nuevo, de lo contrario se dejara el ya cargado.'
      this.articleService.searchById(idArticle).subscribe((item) => {
        this.informationArticle = item;
        //información general del article
        this.articleData = new FormGroup({
          id: new FormControl(item.id, []),
          title: new FormControl(item.title, [Validators.required]),
          abstract: new FormControl(item.abstract, [Validators.required]),
          key_words: new FormControl(item.key_words, [Validators.required])
        });

        //array of authors
        item.authors.forEach(element => {
          console.log(element);
          this.authors.push(JSON.parse(element));
        });

        activeLabels();
        setTimeout(() => {
          updateTextaeras();
        }, 500)


      });
    }
    this.spinner.hide();


  }

  user: UserModel = null;
  publishing: PublishingModel = null;

  articleData: FormGroup;

  authors = new Array();

  authorData = {
    nombre: '',
    apellidos: '',
    entidad: '',
    email: ''
  }

  getUrlParameter = (parameterName: string) => {
    return this.rutaActiva.snapshot.paramMap.get(parameterName);
  }

  saveAuthor = () => {
    if (this.authorData.email == '' || this.authorData.nombre == '' || this.authorData.entidad == '') {
      Swal.fire('Error!', 'Los campos de nombre,entidad y correo son obligatorios', 'error');
      return;
    }

    if (this.search(this.authorData.email) != null) {
      Swal.fire('Error!', 'Ya existe un autor con ese email', 'error');
      return;
    }


    let aux = Object.create(this.authorData);
    this.authors.push(aux);
    this.authorData = {
      nombre: '',
      apellidos: '',
      entidad: '',
      email: ''
    }
    this.closeModalAutores();
  }

  deleteAuthor = (email) => {
    Swal.fire({
      title: 'Advertencia!',
      text: '¿Seguro de que quiere eliminar este autor?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((res) => {
      if (res.value) {
        this.authors.splice(this.search(email), 1);
      }
    });
  }

  search = (email) => {
    for (var i = 0; i < this.authors.length; i++) {
      if (this.authors[i].email == email) {
        return i;
      }
    }
    return null;
  }

  formGroupCreator(): FormGroup {
    return new FormGroup({
      id: new FormControl(null, []),
      title: new FormControl('', [Validators.required]),
      abstract: new FormControl('', [Validators.required]),
      key_words: new FormControl('', [Validators.required])
    });
  }

  get id() {
    return this.articleData.get('id');
  }

  get title() {
    return this.articleData.get('title');
  }

  get abstract() {
    return this.articleData.get('abstract');
  }

  get key_words() {
    return this.articleData.get('key_words');
  }


  get date() {
    return this.articleData.get('date');
  }

  action: string = 'add';
  h3: string = 'Agregar nuevo articulo';
  texto: string = '';


  register(): void {
    if (this.action == 'add') {
      //comprobar que si se selecciono un archivo
      let pdf = getPdfById('file');
      if (isNullOrUndefined(pdf.name)) {
        Swal.fire('Error!', 'Debe de seleccionar un archivo pdf para crear el articulo', 'error');
        return;
      }

      if (this.articleData.valid) {
        this.spinner.show();
        let archivo = new FormData();
        archivo.append('files', pdf);
        this.fileService.createNew(archivo).subscribe((item) => {
          let namearchivo = item.result.files.files[0].name;
          let cadenasAutores = new Array();
          this.authors.forEach(element => {
            cadenasAutores.push(JSON.stringify({
              nombre: element.nombre,
              apellidos: element.apellidos,
              entidad: element.entidad,
              email: element.email
            }));
          });

          let articleModel: ArticleModel = {
            title: this.articleData.get('title').value,
            abstract: this.articleData.get('abstract').value,
            key_words: this.articleData.get('key_words').value,
            authors: cadenasAutores,
            author_id: this.infoAuthor.id,
            publishing_id: this.publishing.id,
            date: new Date(),
            state: 'enviado',
            file: namearchivo,
            assessors: [],
            comments: [],
            id: null,
            author: null
          }

          //enviar al servicio y resar
          this.articleService.createNew(articleModel).subscribe((art) => {
            //enviar emails a los editores
            this.userService.findByRol(2).subscribe((item) => {
              console.log(item);
              let correos = '';
              item.forEach((e) => {
                correos += e.email + ',';
              });

              this.emailService.sendEmail(`Se ha registrado un nuevo artículo.<br>Nombre Artículo: ${art.title}<br>Autor: ${this.infoAuthor.first_name} ${this.infoAuthor.second_name} ${this.infoAuthor.first_last_name} ${this.infoAuthor.second_last_name}`, 'Nuevo Artículo', correos).subscribe(() => {
                this.spinner.hide();
                Swal.fire({
                  title: 'Logrado!',
                  text: 'El artículo fue agregado correctamente.',
                  type: 'success'
                }).then(() => {
                  this.router.navigate(['listArticles']);
                });
              });

            });

          }, (err) => {
            this.spinner.hide();
            Swal.fire('Error!', 'Ocurrió un error al registrar en el servidor', 'error');
          });

        });
      } else {
        Swal.fire('Error!', 'Debe de ingresar todos los datos', 'error');
      }

    } else {
      this.spinner.show();
      let pdf = getPdfById('file');
      if (isNullOrUndefined(pdf)) {//no se cambio el archivo
        if (this.articleData.valid) {
          let cadenasAutores = new Array();
          this.authors.forEach(element => {
            cadenasAutores.push(JSON.stringify({
              nombre: element.nombre,
              apellidos: element.apellidos,
              entidad: element.entidad,
              email: element.email
            }));
          });

          let articleModel: ArticleModel = {
            title: this.articleData.get('title').value,
            abstract: this.articleData.get('abstract').value,
            key_words: this.articleData.get('key_words').value,
            authors: cadenasAutores,
            author_id: this.infoAuthor.id,
            publishing_id: this.publishing.id,
            date: new Date(),
            state: 'enviado',
            file: this.informationArticle.file,
            assessors: this.informationArticle.assessors,
            comments: [],
            id: this.informationArticle.id,
            author: null
          }

          //enviar al servicio y resar
          this.articleService.update(articleModel).subscribe((item) => {
            this.spinner.hide();
            Swal.fire({
              title: 'Logrado!',
              text: 'El artículo fue editado correctamente.',
              type: 'success'
            }).then(() => {
              this.router.navigate(['listArticles']);
            });
          }, (err) => {
            this.spinner.hide();
            Swal.fire('Error!', 'Ocurrió un error al editar en el servidor', 'error');
          });
        } else {
          Swal.fire('Error!', 'Debe de ingresar todos los datos', 'error');
        }
      } else {

        if (this.articleData.valid) {
          //eliminar el archivo existente
          console.log('eliminar')
          this.fileService.delete(this.informationArticle.file).subscribe((item) => {
            console.log(item);
            let archivo = new FormData();
            archivo.append('files', pdf);
            //agregar el nuevo archivo
            this.fileService.createNew(archivo).subscribe((item) => {
              let namearchivo = item.result.files.files[0].name;

              let cadenasAutores = new Array();
              this.authors.forEach(element => {
                cadenasAutores.push(JSON.stringify({
                  nombre: element.nombre,
                  apellidos: element.apellidos,
                  entidad: element.entidad,
                  email: element.email
                }));
              });

              let articleModel: ArticleModel = {
                title: this.articleData.get('title').value,
                abstract: this.articleData.get('abstract').value,
                key_words: this.articleData.get('key_words').value,
                authors: cadenasAutores,
                author_id: this.infoAuthor.id,
                publishing_id: this.publishing.id,
                date: new Date(),
                state: 'enviado',
                file: namearchivo,
                assessors: this.informationArticle.assessors,
                comments: [],
                id: this.informationArticle.id,
                author: null
              }

              //enviar al servicio y resar
              this.articleService.update(articleModel).subscribe((item) => {
                this.spinner.hide();
                Swal.fire({
                  title: 'Logrado!',
                  text: 'El artículo fue editado correctamente.',
                  type: 'success'
                }).then(() => {
                  this.router.navigate(['listArticles']);
                });
              }, (err) => {
                this.spinner.hide();
                Swal.fire('Error!', 'Ocurrió un error al editar en el servidor', 'error');
              });
            });
          })
        } else {
          Swal.fire('Error!', 'Debe de ingresar todos los datos', 'error');
        }
      }
    }

  }

  openModalAutores() {
    this.authorData = {
      nombre: '',
      apellidos: '',
      entidad: '',
      email: ''
    }
    disableLabels();
    openModal('modalAuthors', 'Agregar nuevo autor al artículo');
  }

  closeModalAutores() {
    closeModal('modalAuthors');
    setTimeout(() => {
      activeLabels();
    }, 100);
  }


}
