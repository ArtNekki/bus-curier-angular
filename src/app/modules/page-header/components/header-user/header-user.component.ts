import { Component, OnInit } from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import dropdown from '../../../../core/animations/dropdown';
import {AuthService} from '../../../../core/services/auth/auth.service';
import {SignInComponent} from '../../../../modals/sign-in/sign-in.component';
import {SimpleModalService} from 'ngx-simple-modal';
import {LoginComponent} from '../../../../modals/login/login.component';
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
    this.modalService.addModal(LoginComponent);
    this.isOpen = false;
  }

  showSignInModal(e) {
    e.preventDefault();
    this.modalService.addModal(SignInComponent);
    this.isOpen = false;
  }

  logout() {
    this.auth.logout();
    this.isOpen = false;

    this.router.navigate(['/']);
  }
}
