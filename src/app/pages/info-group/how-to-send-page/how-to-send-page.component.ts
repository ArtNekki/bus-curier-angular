import { Component, OnInit } from '@angular/core';
import {of, Subscription} from 'rxjs';
import {SimpleModalService} from 'ngx-simple-modal';
import { CalculatorService } from 'src/app/core/services/calculator/calculator.service';
import {CitiesModalComponent} from '../../../modals/cities-modal/cities-modal.component';

@Component({
  selector: 'app-how-to-send-page',
  templateUrl: './how-to-send-page.component.html',
  styleUrls: ['./how-to-send-page.component.scss']
})
export class HowToSendPageComponent implements OnInit {
  private cities: any;
  private sub: Subscription;

  constructor(private calcService: CalculatorService,
              private modalService: SimpleModalService) { }

  ngOnInit(): void {
    this.sub = this.calcService.getCitiesFrom()
      .subscribe((cities) => {
        this.cities = cities;
      });
  }

  showCitiesModal(e) {
    e.preventDefault();
    this.modalService.addModal(CitiesModalComponent, {
      title: 'Населенные пункты отправления',
      list: of(this.cities)
    });
  }

}
