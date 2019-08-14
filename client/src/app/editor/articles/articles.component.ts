import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleModel } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/services/article.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { PublishingService } from 'src/app/services/publishing.service';
import { AssessorService } from 'src/app/services/assessor.service';
import { AssessorModel } from 'src/app/models/assessor.model';
import { EmailService } from 'src/app/services/email.service';
import { UserauthService } from 'src/app/services/userauth.service';
import { UserService } from 'src/app/services/user.service';

declare const openModal: any;
declare const closeModal: any;
declare const activeLabels: any;
declare const updateTextaeras: any;
declare const iniciarSelect: any;



@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  constructor(private rutaActiva: ActivatedRoute, private articleService: ArticleService, private spinner: NgxSpinnerService, private publishingService: PublishingService, private assessorService: AssessorService, private emailService: EmailService, private authService: UserService) { }

  publishingId: string = '';
  nameEdition: string = '';
  dataArticle: ArticleModel = {
    title: '',
    abstract: '',
    key_words: '',
    authors: [],
    author_id: '',
    publishing_id: '',
    date: new Date(),
    state: '',
    file: '',
    assessors: [],
    comments: [],
    id: '',
    author: null
  };

  ngOnInit() {
    this.publishingId = this.rutaActiva.snapshot.paramMap.get('edition');
    this.publishingService.searchPublishing(this.publishingId).subscribe((item) => {
      this.nameEdition = item.name;
      activeLabels();
      this.getListArticles('');
    });
  }

  listArticles: ArticleModel[];

  getListArticles(state) {
    this.spinner.show();
    if (state == '') {
      this.articleService.loadPublishingsById(this.publishingId).subscribe((item) => {
        this.listArticles = item;
        this.spinner.hide();
      }, () => {
        this.getListArticles(state);
      });
    } else {
      this.articleService.loadPublishings(state, this.publishingId).subscribe((item) => {
        this.listArticles = item;
        this.spinner.hide();
      }, () => {
        this.getListArticles(state);
      });
    }
  }

  info(article) {
    this.dataArticle = article;
    openModal('modalInfo', 'Datos del artículo');
    setTimeout(() => {
      updateTextaeras();
    }, 300);
  }

  closeModalInfo() {
    closeModal('modalInfo');
  }

  closeModalAsignar() {
    closeModal('modalAsignar');
  }



  articleAux: ArticleModel = {
    title: '',
    abstract: '',
    key_words: '',
    authors: [],
    author_id: '',
    publishing_id: '',
    date: new Date(),
    state: '',
    file: '',
    assessors: [],
    comments: [],
    id: '',
    author: null
  };
  listAssessors: AssessorModel[];

  openModalAsignar(article) {
    this.articleAux = article;
    this.assessorService.loadAssessorsAccepted().subscribe((item) => {
      this.listAssessors = item;
      openModal('modalAsignar', 'Seleccione los evaluadores de la lista');
      setTimeout(() => {
        iniciarSelect();
      }, 500);
    });
  }

  asignarAssessors() {
    let count = this.articleAux.assessors.length;
    if (count == 3) {
      this.articleAux.state = 'en evaluación';
      this.articleService.update(this.articleAux).subscribe(() => {
        let correos = '';
        this.listAssessors.forEach(i => {
          this.articleAux.assessors.forEach((j) => {
            if ('id' + i.id == j) {
              correos += i.user.email+',';
            }

          });
        });
        //enviar email a los assesores
        this.emailService.sendEmail(`Se te ha asignado el siguiente artículo para que lo evalues.<br>título: ${this.articleAux.title}<br>Autor: ${this.articleAux.author.first_name} ${this.articleAux.author.second_name} ${this.articleAux.author.first_last_name} ${this.articleAux.author.second_last_name}`, 'Asiganación de artículo', correos).subscribe((item) => {
          console.log(item);
          Swal.fire('Logrado!', 'Evaluadores asigandos correctamente.', 'success').then(() => {
          });
          this.closeModalAsignar();
        });
      });
    } else if (count < 3) {
      Swal.fire('Error!', 'Debe de seleccionar 3 evaluadores', 'error');
    } else {
      Swal.fire('Error!', 'Debe de seleccionar solo 3 evaluadores', 'error');
    }

  }


}
