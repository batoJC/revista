import { Component, OnInit } from '@angular/core';
import { UserauthService } from 'src/app/services/userauth.service';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private serviceAuth: UserauthService,private route: Router) { }

  email: string = '';
  password: string = '';

  ngOnInit() {
  }

  login():void{
    this.serviceAuth.loginUser(this.email,this.password).subscribe(item => {
      this.serviceAuth.saveToken(item.id);
      this.serviceAuth.saveUserInformation(item.user);
      this.route.navigate(['/']);
    });
  }

}
