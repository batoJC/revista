import { Component, OnInit } from '@angular/core';
import { EstadisticasService } from 'src/app/services/estadisticas.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { PublishingComponent } from '../../publishing/publishing.component';
import { PublishingService } from 'src/app/services/publishing.service';
import { isNullOrUndefined } from 'util';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

declare const initLine: any;

@Component({
  selector: 'app-aceptacion',
  templateUrl: './aceptacion.component.html',
  styleUrls: ['./aceptacion.component.css']
})
export class AceptacionComponent implements OnInit {



  constructor(private estadisticasService: EstadisticasService, private spinner: NgxSpinnerService, private rutaActiva: ActivatedRoute, private publishingService: PublishingService) {
    this.spinner.show();
    this.data = new Array();
    this.publishingService.loadPublishings().subscribe((item) => {
      item.forEach((p) => {
        this.estadisticasService.countByPublishing(p.id, 'aceptado').subscribe((a) => {
          this.estadisticasService.countByPublishing(p.id, 'rechazado').subscribe((r) => {

            a.count = (isNullOrUndefined(a.count)) ? 0 : a.count;
            r.count = (isNullOrUndefined(r.count)) ? 0 : r.count;
            console.log(a.count);
            console.log(r.count);
            console.log(((r.count + a.count) * 100) / a.count);

            let aux = new Array();
            aux.push(p.name);
            aux.push(a.count);
            aux.push(r.count);
            if(a.count == 0){
              aux.push(0);
            }else{
              aux.push(((r.count + a.count) * 100) / a.count);
            }
            this.data.push(aux);
          });
        });
      });
    });

    //crear las variables para las lineas
    // var dataSecond = {
    //   label: "Car B - Speed (mph)",
    //   data: [20, 15, 60, 60, 65, 30, 70],
    //   // Set More Options
    // };

    setTimeout(() => {
      let aux0 = new Array();
      let aux1 = new Array();
      let aux2 = new Array();
      let aux3 = new Array();
      this.data.forEach((l) => {
        aux0.push(l[0]);
        aux1.push(l[1]);
        aux2.push(l[2]);
        aux3.push(l[3]);
      });
      //archivos aceptados
      var aceptados = {
        label: "Artículos aceptados",
        data: aux1,
			  fill:false,
			  borderColor:'#00897b',
			  backgroundColor:'#00897b',
			  pointBorderColor:'#00897b',
			  pointBackgroundColor:'#00897b',
			  pointRadius: 5,
        pointHoverRadius: 8,
        lineTension:0.5
        
      };
      //archivos rechazados
      var rechazados = {
        label: "Artículos rechazados",
        data: aux2,
			  fill:false,
			  borderColor:'#f44336',
			  backgroundColor:'#f44336',
			  pointBorderColor:'#f44336',
			  pointBackgroundColor:'#f44336',
			  pointRadius: 5,
        pointHoverRadius: 8,
        lineTension:0.5
        
      };
      //porcentaje de acptación
      var accept = {
        label: "Porcentaje de aceptación",
        data: aux3,
			  fill:false,
			  borderColor:'#1565c0',
			  backgroundColor:'#1565c0',
			  pointBorderColor:'#1565c0',
			  pointBackgroundColor:'#1565c0',
			  pointRadius: 5,
        pointHoverRadius: 8,
        lineTension:0.5
        
      };


      //enviar al js
      initLine('dosLineas', aux0, new Array(aceptados, rechazados));
      initLine('unaLinea', aux0, [accept]);


      this.spinner.hide();
    }, 2000);

  }

  data;

  ngOnInit() {
  }

  generarPDF() {
    var doc = new jsPDF();

    let contador = (isNullOrUndefined(doc.previousAutoTable.finalY)) ? 0 : doc.previousAutoTable.finalY;
    if (this.data.length > 0) {
      doc.text(14, 0, "Listado de las diferentes ediciones de la revista");
      doc.autoTable({ startY: contador + 20, html: '#datos' });
    }

    doc.save('lista.pdf');
  }

}
