import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { AuthorService } from 'src/app/services/author.service';
import { EstadisticasService } from 'src/app/services/estadisticas.service';
import { isNullOrUndefined } from 'util';

declare const initBar:any;

@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styleUrls: ['./autores.component.css']
})
export class AutoresComponent implements OnInit {

  constructor(private autorService:AuthorService,private estadisticasService:EstadisticasService, private spinner: NgxSpinnerService, private rutaActiva: ActivatedRoute) { 
    this.spinner.show();
    let id = this.rutaActiva.snapshot.paramMap.get('id');//publishing id
    this.data = Array();
    this.autorService.loadAuthors().subscribe(aut=>{
      aut.forEach((a)=>{
        this.estadisticasService.countByArticle(id,a.id).subscribe(art=>{
          if(art.count > 0){
            this.data.push([`${a.first_name} ${a.second_name} ${a.first_last_name} ${a.second_last_name}`, art.count])
          }
        })
      });

      setTimeout(()=>{
        let labels = new Array();
        let nro = new Array();

        console.log(this.data);

        this.data.forEach((d)=>{
          labels.push(d[0]);
          nro.push(d[1]);
        });

        console.log(labels);
        console.log(nro);


        initBar('autores',labels,nro,'Artículos por edición');
        this.spinner.hide();

      },2000);
    });    
  }

  data;

  ngOnInit() {
  }

  generarPDF() {
    var doc = new jsPDF();

    let contador = (isNullOrUndefined(doc.previousAutoTable.finalY)) ? 0 : doc.previousAutoTable.finalY;
    if (this.data.length > 0) {
      doc.text(14, 15, "Listado con el número de artículos para esta edición");
      doc.autoTable({ startY: contador + 20, html: '#datos' });
    }

    doc.save('lista.pdf');
  }

}
