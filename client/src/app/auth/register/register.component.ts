import { Component, OnInit } from '@angular/core';
import { AuthorModel } from 'src/app/models/author.model';
import { AuthorService } from 'src/app/services/author.service';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

declare const iniciarSelect: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authorService: AuthorService,private userService: UserService) { }

  dataUser: UserModel = {
    id: null,
    realm: '',
    username: '',
    email: '',
    password: '',
    rol: 1,
    user: null
  };
  
  dataAuthor: AuthorModel = {
    first_name: '',
    second_name: '',
    first_last_name: '',
    second_last_name: '',
    country: '',
    phone: '',
    level_education: '',
    user_id: '',
    id: null
  };

  ngOnInit() {
    iniciarSelect();
  }


  register():void{
    this.dataUser.username = `${this.dataAuthor.first_name} ${this.dataAuthor.first_last_name}`;
    this.userService.createNew(this.dataUser).subscribe(item => {
      this.dataAuthor.user_id = item.id;
      this.authorService.createNew(this.dataAuthor).subscribe(item => {
        console.log(item);
      });
    });
  }


}
