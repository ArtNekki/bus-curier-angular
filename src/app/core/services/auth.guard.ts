import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth/auth.service';
import {LoginModalComponent} from '../../modals/login-modal/login-modal.component';
import {SimpleModalService} from 'ngx-simple-modal';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private modalService: SimpleModalService,
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.auth.isAuthenticated()) {
      return true;
    } else {
      this.auth.logout();
      this.showLoginModal();
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }

  showLoginModal() {
    this.modalService.addModal(LoginModalComponent).subscribe((result) => {
      this.router.navigate(['/account', 'index'], {

      });
    });
  }
}
