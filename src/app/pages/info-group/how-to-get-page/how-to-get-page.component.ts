import {Component, OnDestroy, OnInit} from '@angular/core';
import {of, Subscription, zip} from 'rxjs';
import {SimpleModalService} from 'ngx-simple-modal';
import { CalculatorService } from 'src/app/core/services/calculator/calculator.service';
import {CitiesModalComponent} from '../../../modals/cities-modal/cities-modal.component';

@Component({
  selector: 'app-how-to-get-page',
  templateUrl: './how-to-get-page.component.html',
  styleUrls: ['./how-to-get-page.component.scss']
})
export class HowToGetPageComponent implements OnInit, OnDestroy {
  private cities: any;
  private sub: Subscription;

  constructor(private calcService: CalculatorService,
              private modalService: SimpleModalService) { }

  ngOnInit(): void {

    this.sub = this.calcService.getCityTo(1, 0)
      .subscribe((cities) => {
        this.cities = cities;
      });
  }

  showCitiesModal(e) {
    e.preventDefault();
    this.modalService.addModal(CitiesModalComponent, {
      title: 'Населенные пункты получения',
      list: of(this.cities)
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
