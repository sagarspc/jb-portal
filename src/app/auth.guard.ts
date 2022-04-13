import { Injectable } from '@angular/core';
import {CanActivate, Router,ActivatedRouteSnapshot} from '@angular/router';
import { TokenStorageService } from './_services/token-storage.service';





@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private tokenStorage: TokenStorageService,
    ) {}

  canActivate(route: ActivatedRouteSnapshot){
    let user = this.tokenStorage.getUser();
      if(user.roles == 'ROLE_ADMIN'){
        return true;
      }
      this.router.navigate(['/']);
      return false;
  }
}
