import { Component, OnInit } from '@angular/core';
import {SimpleModalService} from 'ngx-simple-modal';
import {CseModalComponent} from '../../../../../modals/cse-modal/cse-modal.component';

@Component({
  selector: 'app-calc-box',
  templateUrl: './calc-box.component.html',
  styleUrls: ['./calc-box.component.scss']
})
export class CalcBoxComponent implements OnInit {

  constructor(private modalService: SimpleModalService) { }

  ngOnInit(): void {
  }

  showModal() {
    this.modalService.addModal(CseModalComponent)
      .subscribe();
  }
}
