import { Component, OnInit } from '@angular/core';
import {SimpleModalService} from 'ngx-simple-modal';
import {Router} from '@angular/router';
import {LoginModalComponent} from '../../../../../../modals/login-modal/login-modal.component';

@Component({
  selector: 'app-done-page',
  templateUrl: './done-page.component.html',
  styleUrls: ['./done-page.component.scss']
})
export class DonePageComponent implements OnInit {

  constructor(
    private modalService: SimpleModalService,
    private router: Router) { }

  ngOnInit(): void {
  }

  showLoginModal() {
    // e.preventDefault();
    this.modalService.addModal(LoginModalComponent);
  }

  goToIndex() {
    this.router.navigate(['/']);
  }

}
