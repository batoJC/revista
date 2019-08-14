import { Component, OnInit } from '@angular/core';
import { PublishingModel } from 'src/app/models/publishing.model';
import { PublishingService } from 'src/app/services/publishing.service';
import { NgxSpinnerService } from 'ngx-spinner';

declare const startTooltip : any;

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  constructor(private publishingService: PublishingService,private spinner: NgxSpinnerService) {
    this.spinner.show();
    this.publishingService.loadPublishings().subscribe((item)=>{
      this.listaEdiciones = item;
      setInterval(()=>{
        startTooltip();
      },1000);
      this.spinner.hide();
    });
   }

  listaEdiciones: PublishingModel[];

  ngOnInit() {
  }

}
