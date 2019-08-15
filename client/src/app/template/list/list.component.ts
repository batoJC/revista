import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { PublishingService } from 'src/app/services/publishing.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private articlesService: ArticleService, private spinner: NgxSpinnerService, private publishingService: PublishingService) { }

  lista: any[] = new Array();
  cp:number = 1;
  total:number = 0;

  ngOnInit() {
    this.spinner.show();
    this.publishingService.getActive().subscribe((item) => {
      this.articlesService.lista(item.id).subscribe((item) => {
        let i = 0;
        let aux = new Array();
        item.forEach((article) => {
          if (i < 3) {
            aux.push(article);
            i++;
          }
          if (i == 3) {
            this.lista.push(aux);
            i = 0;
            aux = new Array();
          }
        });
        this.lista.push(aux);
        this.spinner.hide();
      });
    },(erro)=>{
      this.spinner.hide();
    });
  }

}
