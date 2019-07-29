import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserauthService } from '../services/userauth.service';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class NotLoginGuard implements  CanActivate {
  constructor(private userService: UserauthService, private router: Router){

  }

  canActivate(){
    if(!isNullOrUndefined(this.userService.getUserInformation())){
      this.router.navigate(["/"]);
      return false;
    }else{
      return true;
    }
  }
}
