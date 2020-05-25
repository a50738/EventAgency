import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private _authService: AuthService,
    private _router: Router) { }

  permission: string

  canActivate(): boolean {
    
    this._authService.getPermission()
      .subscribe(
        res => { this.permission = res },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              console.log('error')
            }
          }
        }
      )

    if (this.permission == 'admin') {
      return true
    }
    else {
      this._router.navigate(['service/events'])
      return false
    }
  }

}
