import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserauthService } from 'src/app/services/userauth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AssessorService } from 'src/app/services/assessor.service';
import { AssessorModel } from 'src/app/models/assessor.model';

declare const iniciarSelect: any;
declare const openModal: any;
declare const closeModal: any;
declare const activeLabels: any;
declare const disableLabels: any;

@Component({
  selector: 'app-assesors',
  templateUrl: './assesors.component.html',
  styleUrls: ['./assesors.component.css']
})
export class AssesorsComponent implements OnInit {

  token: string = '';
  assessorData: FormGroup;

  constructor(private assessorService: AssessorService, private userService: UserService, private spinner: NgxSpinnerService, private authService: UserauthService) {
    this.token = authService.getToken();
    this.assessorData = this.formGroupCreator();
    // this.loadAssessorData();
   }

   formGroupCreator(): FormGroup{
     return new FormGroup({
      id: new FormControl(null,[]),
      first_name : new FormControl('', [Validators.required]),
      second_name: new FormControl(''),
      first_last_name: new FormControl('', [Validators.required]),
      second_last_name: new FormControl(''),
      country: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      level_education: new FormControl('', [Validators.required]),
      afilation: new FormControl('', [Validators.required]),
      user_id: new FormControl(null, []),
     });
     
   }

   listEditors: AssessorModel[] = [];

  ngOnInit() {
  }

}
