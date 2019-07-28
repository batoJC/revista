import { Component, OnInit } from '@angular/core';
import { UserauthService } from 'src/app/services/userauth.service';
import { isNullOrUndefined } from 'util';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';

declare const iniciar: any;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private authService: UserauthService,private router: Router) { }

  rol: number = 0;

  ngOnInit() {
    this.infoMenu();
    setTimeout(()=>{
      iniciar();
    },1000);

    this.router.events.pipe().subscribe(() => {
      this.infoMenu();
    });

  }

  infoMenu() {
    let user = this.authService.getUserInformation();
    if (!isNullOrUndefined(user)) {
      this.rol = user.rol;
    }else{
      this.rol = 0;
    }
  }


}
