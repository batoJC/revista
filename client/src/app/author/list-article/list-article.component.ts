import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ArticleModel } from 'src/app/models/article.model';
import { UserauthService } from 'src/app/services/userauth.service';
import { UserModel } from 'src/app/models/user.model';
import { CommentModel } from 'src/app/models/comment.model';
import * as jsPDF from 'jspdf';
import { FilesService } from 'src/app/services/files.service';
import Swal from 'sweetalert2';
import { AuthorService } from 'src/app/services/author.service';
import { AuthorModel } from 'src/app/models/author.model';


declare const openModal: any;
declare const closeModal: any;
declare const getPdfById: any;


@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.css']
})
export class ListArticleComponent implements OnInit {

  constructor(private articleService: ArticleService, private spinner: NgxSpinnerService, private authService: UserauthService, private fileService: FilesService, private authorService:AuthorService) { }

  infoAuthor: AuthorModel;
  usuario: UserModel = null;

  ngOnInit() {
    this.usuario = this.authService.getUserInformation();
    this.authorService.findByUserId(this.usuario.id).subscribe((item) => {
      this.infoAuthor = item[0];
      this.getListArticles();
    });
  }

  listArticles: ArticleModel[];

  getListArticles() {
    this.spinner.show();
    this.articleService.loadPublishing(this.infoAuthor.id).subscribe((item) => {
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
    var doc = new jsPDF("p", "pt", "a4");
    let contador = 40;
    this.comments.forEach(element => {
      let fecha = new Date(element.date).toString();
      let nombre = `${element.assessor.first_name} ${element.assessor.second_name} ${element.assessor.first_last_name} ${element.assessor.second_last_name}`;
      let body = null;
      doc.setFontSize(12);
      body = doc.splitTextToSize(element.body, 480);
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 255);
      doc.text(30, contador, fecha);
      doc.setTextColor(0, 0, 0);
      contador += 30;
      doc.setFontSize(20);
      doc.text(50, contador, nombre);
      contador += 20;
      doc.setFontSize(12);
      doc.text(50, contador, body);
      contador += (body.length * 12) + 15;
      doc.setFontSize(8);
      doc.setTextColor(0, 0, 255);
      doc.text(50, contador, `${element.stars} Estrellas`);
      contador += 15
    });
    // doc.output('datauri');

    doc.save('comments.pdf');
  }

  changeFile(article) {
    this.spinner.show();
    this.fileService.delete(article.file).subscribe((item) => {
      let pdf = getPdfById('file'+article.id);
      let archivo = new FormData();
      archivo.append('files', pdf);

      this.fileService.createNew(archivo).subscribe((item) => {
        let namearchivo = item.result.files.files[0].name;
        article.file = namearchivo;
        article.state = 'aceptado';
        this.articleService.update(article).subscribe(() => {
          Swal.fire('Logrado!','Archivo cargado Correctamente.','success').then(()=>{
            this.getListArticles();
          });
          this.spinner.hide();
        });
      });
    });
  }

}
