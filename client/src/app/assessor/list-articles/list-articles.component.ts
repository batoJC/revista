import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserauthService } from 'src/app/services/userauth.service';
import { UserModel } from 'src/app/models/user.model';
import { ArticleModel } from 'src/app/models/article.model';
import { CommentService } from 'src/app/services/comment.service';
import { CommentModel } from 'src/app/models/comment.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AssessorService } from 'src/app/services/assessor.service';
import { AssessorModel } from 'src/app/models/assessor.model';

declare const openModal: any;
declare const closeModal: any;
declare const disableLabels: any;
declare const activeLabels: any;
declare const updateTextaeras: any;


@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.css']
})
export class ListArticlesComponent implements OnInit {

  constructor(private articleService: ArticleService, private spinner: NgxSpinnerService, private authService: UserauthService, private commentService: CommentService, private assessorService: AssessorService) {
    // this.commentService.countByArticle('5d450f6b3b147c265c3f1667').subscribe((item)=>{
    //   console.log(item.count);
    // });
    this.commentData = this.formGroupCreater(0, '');
  }

  commentData: FormGroup;
  usuario: UserModel = null;
  assessorData: AssessorModel;

  formGroupCreater(estrellas, cuerpo): FormGroup {
    return new FormGroup({
      stars: new FormControl(estrellas, [Validators.required]),
      body: new FormControl(cuerpo, [Validators.required])
    });
  }

  get stars() {
    return this.commentData.get('stars');
  }

  get body() {
    return this.commentData.get('body');
  }

  ngOnInit() {
    this.usuario = this.authService.getUserInformation();
    this.assessorService.findByIdUser(this.usuario.id).subscribe((item) => {
      this.assessorData = item[0];
      this.getListArticles();
    });

  }

  listArticles: ArticleModel[];

  // commentData: CommentModel:{
  //   assessor_id: string;
  //   article_id: string;
  //   date: Date;
  //   body: string;
  //   stars: Number;
  //   id: string;
  //   assessor: AssessorModel
  // }

  getListArticles() {
    this.spinner.show();

    this.articleService.loadArticleByAssessor(this.assessorData.id).subscribe((item) => {
      this.listArticles = item;
      this.spinner.hide();
    }, () => {
      // this.getListArticles();
    });
  }

  articleId: string = '';

  starsA = Array;

  coment = {
    estars: 0,
    ebody: ''
  };

  open = true;

  modalEvaluar(id: string) {
    this.articleId = id;
    this.open = true;
    this.articleService.comments(id).subscribe((item) => {
      item.forEach((e) => {
        if (e.assessor_id == this.assessorData.id) {
          console.log(e);
          this.open = false;
          this.coment = {
            estars: e.stars,
            ebody: e.body
          };
          openModal('infoModal', 'Calificación del artículo');
          activeLabels();
        }
      });
      if (this.open) {
        disableLabels();
        openModal('evaluarModal', 'Calificar este artículo');
      }
    })
  }

  registrar() {
    if (this.commentData.valid) {
      let comment: CommentModel = {
        assessor_id: this.assessorData.id,
        article_id: this.articleId,
        date: new Date(),
        body: this.body.value,
        stars: this.stars.value,
        id: null,
        assessor: null
      }

      this.commentService.createNew(comment).subscribe((item) => {
        this.commentService.countByArticle(this.articleId).subscribe((item) => {
          let comentarios = item.count;
          if (comentarios == 3) {
            this.articleService.searchById(this.articleId).subscribe((item) => {
              let total = 0;
              item.comments.forEach((e) => {
                total += e.stars;
              });
              let promedio = total / 3;
              if (promedio < 3) {
                item.state = 'rechazado';
              } else if (promedio < 4) {
                item.state = 'aceptado con cambios';
              } else {
                item.state = 'aceptado';
              }
              this.articleService.update(item).subscribe(() => {
                Swal.fire('Logrado!', 'Comentario agregado correctamenta', 'success').then(() => {
                  this.getListArticles();
                  this.closeModalEvaluar();
                });
              });
            });
          } else {

            Swal.fire('Logrado!', 'Comentario agregado correctamenta', 'success').then(() => {
              this.getListArticles();
              this.closeModalEvaluar();
            });
          }
        });
      });

    } else {
      Swal.fire('Error!', 'Debe de ingresar todos los datos', 'error');
    }
  }

  closeModalEvaluar() {
    closeModal('evaluarModal');
    this.commentData = this.formGroupCreater(0, '');
    disableLabels();
  }

  closeModalInfo(){
    closeModal('infoModal');
    disableLabels();
  }


}
