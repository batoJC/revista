import { Component, OnInit } from '@angular/core';
import { UserauthService } from 'src/app/services/userauth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: UserauthService,private route: Router) { }

  ngOnInit() {
  }

  logout(){
    this.authService.logoutUser();
    this.route.navigateByUrl('/', {skipLocationChange: true}).then(()=> this.route.navigate(["/"]));
  }

}
