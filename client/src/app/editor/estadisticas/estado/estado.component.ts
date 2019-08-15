import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { ArticleModel } from 'src/app/models/article.model';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

declare const initBar: any;

@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.css']
})
export class EstadoComponent implements OnInit {

  constructor(private articleService: ArticleService, private spinner: NgxSpinnerService, private rutaActiva: ActivatedRoute) {
    this.spinner.show();
    let nombres = new Array('enviado', 'en evaluación', 'rechazado', 'aceptado con cambios', 'aceptado');
    let id = this.rutaActiva.snapshot.paramMap.get('id');
    let data = new Array();
    nombres.forEach((n) => {
      this.articleService.loadPublishings(n, id).subscribe((item) => {
        console.log(item);
        if (!isNullOrUndefined(item)) {
          data.push([n.toUpperCase(), item.length]);
          switch (n) {
            case 'enviado':
              this.listaEnviado = item;
              break;
            case 'en evaluación':
              this.listaEvaluacion = item;
              break;
            case 'rechazado':
              this.listaRechazado = item;
              break;
            case 'aceptado con cambios':
              this.listaCambios = item;
              break;
            case 'aceptado':
              this.listaAceptado = item;
              break;
          }
        } else {
          data.push([n.toUpperCase(), 0]);
        }
      })
    });
    setTimeout(() => {
      let labels = new Array();
      let nro = new Array();
      data.forEach(e => {
        labels.push(e[0]);
        nro.push(e[1]);
      })
      initBar('articulos', labels, nro, 'Artículos por estado de envío');
      this.spinner.hide();
    }, 1000);
  }

  ngOnInit() {
  }

  listaEnviado: ArticleModel[] = [];
  listaEvaluacion: ArticleModel[] = [];
  listaRechazado: ArticleModel[] = [];
  listaCambios: ArticleModel[] = [];
  listaAceptado: ArticleModel[] = [];

  generarPDF() {
    var doc = new jsPDF();

    let contador = (isNullOrUndefined(doc.previousAutoTable.finalY)) ? 0 : doc.previousAutoTable.finalY;
    if (this.listaEnviado.length > 0) {
      doc.text(14, 15, "Artículos enviados");
      doc.autoTable({ startY: contador + 20, html: '#enviados' });
    }

    contador = (isNullOrUndefined(doc.previousAutoTable.finalY)) ? 0 : doc.previousAutoTable.finalY;
    if (this.listaEvaluacion.length > 0) {
      doc.text(14, contador + 15, "Artículos en evaluación")
      doc.autoTable({ startY: contador + 20, html: '#evaluacion' });
    }

    contador = (isNullOrUndefined(doc.previousAutoTable.finalY)) ? 0 : doc.previousAutoTable.finalY;
    if (this.listaRechazado.length > 0) {
      doc.text("Artículos rechazados", 14, contador + 15)
      doc.autoTable({ startY: contador + 20, html: '#rechazados' });
    }

    contador = (isNullOrUndefined(doc.previousAutoTable.finalY)) ? 0 : doc.previousAutoTable.finalY;
    if (this.listaCambios.length > 0) {
      doc.text("Artículos aceptados con cambios", 14, contador + 15);
      doc.autoTable({ startY: contador + 20, html: '#cambios' });
    }

    contador = (isNullOrUndefined(doc.previousAutoTable.finalY)) ? 0 : doc.previousAutoTable.finalY;


    if (this.listaAceptado.length > 0) {
      doc.text("Artículos aceptados", 14, contador +15)
      doc.autoTable({ startY: contador + 20, html: '#aceptados' });
    }

    doc.save('lista.pdf');
  }

}
