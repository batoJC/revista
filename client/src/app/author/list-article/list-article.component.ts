import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ArticleModel } from 'src/app/models/article.model';
import { UserauthService } from 'src/app/services/userauth.service';
import { UserModel } from 'src/app/models/user.model';
import { CommentModel } from 'src/app/models/comment.model';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';


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
    html2canvas(document.getElementById('commentPDF'), {
      allowTaint: true,
      useCORS: false,
      scale: 0.9
    }).then(function (canvas) {
      console.log(canvas);
      var img = canvas.toDataURL("image/png");
      console.log(img);
      var doc = new jsPDF();
      doc.addImage(img, 'JPEG', 20, 20);
      doc.save('comments.pdf');

      // Few necessary setting options  
      // var imgWidth = 208;   
      // var pageHeight = 295;    
      // var imgHeight = canvas.height * imgWidth / canvas.width;  
      // var heightLeft = imgHeight;  
  
      // const contentDataURL = canvas.toDataURL('image/png')  
      // let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      // var position = 0;  
      // pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      // pdf.save('MYPdf.pdf'); // Generated PDF 

    });
  }

}
