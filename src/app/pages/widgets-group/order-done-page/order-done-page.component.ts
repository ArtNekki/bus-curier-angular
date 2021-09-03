import { Component, OnInit } from '@angular/core';
import {LoginComponent} from '../../../modals/login/login.component';
import {SimpleModalService} from 'ngx-simple-modal';
import {Router} from '@angular/router';

@Component({
  selector: 'app-order-done-page',
  templateUrl: './order-done-page.component.html',
  styleUrls: ['./order-done-page.component.scss']
})
export class OrderDonePageComponent implements OnInit {

  constructor(
    private modalService: SimpleModalService,
    private router: Router) { }

  ngOnInit(): void {
  }

  showLoginModal() {
    // e.preventDefault();
    this.modalService.addModal(LoginComponent);
  }

  goToIndex() {
    this.router.navigate(['/']);
  }

}
