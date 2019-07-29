import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserauthService } from '../services/userauth.service';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class WriterGuard implements  CanActivate {
  constructor(private userService: UserauthService, private router: Router){

  }

  canActivate(){
    let user = this.userService.getUserInformation();
    if(user.id == 2){
      return true;
    }else{
      this.router.navigate(["/"]);
      return false;
    }
  }
}
