import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ArticleModel } from 'src/app/models/article.model';
import { UserauthService } from 'src/app/services/userauth.service';
import { UserModel } from 'src/app/models/user.model';
import { CommentModel } from 'src/app/models/comment.model';
import * as jsPDF from 'jspdf';


declare const openModal: any;
declare const closeModal: any;

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.css']
})
export class ListArticleComponent implements OnInit {

  constructor(private articleService: ArticleService, private spinner: NgxSpinnerService, private authService: UserauthService) { }

  usuario: UserModel = null;

  ngOnInit() {
    this.usuario = this.authService.getUserInformation();
    this.getListArticles();
  }

  listArticles: ArticleModel[];

  getListArticles() {
    this.spinner.show();
    this.articleService.loadPublishing(this.usuario.id).subscribe((item) => {
      this.listArticles = item;
      this.spinner.hide();
    }, () => {
      this.getListArticles();
    });
  }

  comments: CommentModel[];

  stars = Array;

  commentsByArticle(id) {
    this.articleService.comments(id).subscribe((item) => {
      this.comments = item;
      openModal('commentsModal', 'Comentarios del artículo');
    })
  }

  generarPDF() {
    var doc = new jsPDF("p","pt","a4");
    let contador = 40;
    this.comments.forEach(element => {
      let fecha = new Date(element.date).toString();
      let nombre = `${element.assessor.first_name} ${element.assessor.second_name} ${element.assessor.first_last_name} ${element.assessor.second_last_name}`;
      let body = doc.splitTextToSize(element.body, 680);
      let underLine = '______________________________________________';
      doc.setFontSize(10);
      doc.setTextColor(0,0,255);
      doc.text(30, contador,fecha);
      doc.setTextColor(0,0,0);
      contador += 20;
      doc.setFontSize(20);
      doc.text(50, contador,nombre);
      contador += 15;
      doc.setFontSize(12);
      doc.text(50, contador,body);
      contador += (body.length * 10) + 15;
      doc.setFontSize(8);
      doc.setTextColor(0,0,255);
      doc.text(50,contador,`${element.stars} Estrellas`);
      doc.setTextColor(150);
      contador += 10;
      doc.text(0, contador,underLine+underLine+underLine);
    });
    // doc.output('datauri');

    doc.save('comments.pdf');
  }

}
