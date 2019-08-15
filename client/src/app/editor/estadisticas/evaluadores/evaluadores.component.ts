import { Component, OnInit } from '@angular/core';
import { EstadisticasService } from 'src/app/services/estadisticas.service';
import { AssessorModel } from 'src/app/models/assessor.model';
import { isNullOrUndefined } from 'util';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { NgxSpinnerService } from 'ngx-spinner';

declare const initBar: any;

@Component({
  selector: 'app-evaluadores',
  templateUrl: './evaluadores.component.html',
  styleUrls: ['./evaluadores.component.css']
})
export class EvaluadoresComponent implements OnInit {

  constructor(private estadisticasService: EstadisticasService,private spinner:NgxSpinnerService) {
    this.spinner.show();
    let nombres = new Array('Video-Games', 'Ingenieria', 'Musica', 'Biologia', 'Otros');
    let data = new Array();
    nombres.forEach((n) => {
      this.estadisticasService.findPorEspecialidad(n).subscribe((item) => {
        if (!isNullOrUndefined(item)) {
          data.push([n, item.length]);
          switch (n) {
            case 'Video-Games':
              this.listaGames = item;
              break;
            case 'Ingenieria':
              this.listaIngenieria = item;
              break;
            case 'Musica':
              this.listaMusica = item;
              break;
            case 'Biologia':
              this.listaBiologia = item;
              break;
            case 'Otros':
              this.listaOtros = item;
              break;
          }
        } else {
          data.push([n, 0]);
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
      initBar('evaluadores', labels, nro, 'Evaluadores por área de formación');
      this.spinner.hide();
    }, 1000);
  }

  ngOnInit() {
  }

  listaGames: AssessorModel[] = [];
  listaIngenieria: AssessorModel[] = [];
  listaMusica: AssessorModel[] = [];
  listaBiologia: AssessorModel[] = [];
  listaOtros: AssessorModel[] = [];


  generarPDF() {
    var doc = new jsPDF();

    let contador = (isNullOrUndefined(doc.previousAutoTable.finalY)) ? 0 : doc.previousAutoTable.finalY;
    if (this.listaBiologia.length > 0) {
      doc.text(14, 15, "Evaluadores expertos en Biologia");
      doc.autoTable({ startY: contador + 20, html: '#biologia' });
    }

    contador = (isNullOrUndefined(doc.previousAutoTable.finalY)) ? 0 : doc.previousAutoTable.finalY;
    if (this.listaGames.length > 0) {
      doc.text(14, contador + 15, "Evaluadores expertos en Video-Games")
      doc.autoTable({ startY: contador + 20, html: '#games' });
    }

    contador = (isNullOrUndefined(doc.previousAutoTable.finalY)) ? 0 : doc.previousAutoTable.finalY;
    if (this.listaIngenieria.length > 0) {
      doc.text("Evaluadores expertos en Video-Games", 14, contador + 15)
      doc.autoTable({ startY: contador + 20, html: '#ingenieria' });
    }

    contador = (isNullOrUndefined(doc.previousAutoTable.finalY)) ? 0 : doc.previousAutoTable.finalY;
    if (this.listaMusica.length > 0) {
      doc.text("Evaluadores expertos en Musica", 14, contador + 15);
      doc.autoTable({ startY: contador + 20, html: '#musica' });
    }

    contador = (isNullOrUndefined(doc.previousAutoTable.finalY)) ? 0 : doc.previousAutoTable.finalY;


    if (this.listaOtros.length > 0) {
      doc.text("Evaluadores expertos en Video-Games", 14, contador +15)
      doc.autoTable({ startY: contador + 20, html: '#otros' });
    }

    doc.save('lista.pdf');
  }



}
