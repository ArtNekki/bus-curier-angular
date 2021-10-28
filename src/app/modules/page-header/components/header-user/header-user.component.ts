import { Component, OnInit } from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import dropdown from '../../../../core/animations/dropdown';
import {AuthService} from '../../../../core/services/auth/auth.service';
import {SignInModalComponent} from '../../../../modals/sign-in-modal/sign-in-modal.component';
import {SimpleModalService} from 'ngx-simple-modal';
import {LoginModalComponent} from '../../../../modals/login-modal/login-modal.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.scss'],
  animations: [dropdown]
})
export class HeaderUserComponent implements OnInit {

  public isOpen = false;
  public loggedIn = true;

  constructor(
    private router: Router,
    public auth: AuthService,
    private modalService: SimpleModalService
  ) { }

  ngOnInit(): void {
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  showLoginModal(e) {
    e.preventDefault();
    this.modalService.addModal(LoginModalComponent);
    this.isOpen = false;
  }

  showSignInModal(e) {
    e.preventDefault();
    this.modalService.addModal(SignInModalComponent);
    this.isOpen = false;
  }

  logout() {
    this.auth.logout();
    this.isOpen = false;

    this.router.navigate(['/']);
  }
}
