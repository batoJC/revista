import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleModel } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/services/article.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { PublishingService } from 'src/app/services/publishing.service';

declare const openModal : any;
declare const closeModal: any;
declare const activeLabels: any;
declare const updateTextaeras: any;



@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  constructor(private rutaActiva: ActivatedRoute, private articleService: ArticleService, private spinner: NgxSpinnerService, private publishingService: PublishingService) { }

  publishingId: string = '';
  nameEdition: string = '';
  dataArticle:ArticleModel = {
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
    id: '',
  };

  ngOnInit() {
    this.publishingId = this.rutaActiva.snapshot.paramMap.get('edition');
    this.publishingService.searchPublishing(this.publishingId).subscribe((item) => {
      this.nameEdition = item.name;
      activeLabels();
    });
  }

  listArticles: ArticleModel[];

  getListArticles(state) {
    this.spinner.show();
    console.log(this.publishingId);
    this.articleService.loadPublishings(state, this.publishingId).subscribe((item) => {
      this.listArticles = item;
      this.spinner.hide();
    }, () => {
      this.getListArticles(state);
    });
  }

  info(article) {
    this.dataArticle = article;
    openModal('modalInfo','Datos del artículo');
    setTimeout(()=>{
      updateTextaeras();
    },300);
  }

  closeModal(){
    closeModal('modalInfo');
  }



}
