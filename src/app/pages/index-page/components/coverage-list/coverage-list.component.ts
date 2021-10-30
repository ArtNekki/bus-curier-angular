import {Component, OnDestroy, OnInit} from '@angular/core';
import {SimpleModalService} from 'ngx-simple-modal';
import {CitiesModalComponent} from '../../../../modals/cities-modal/cities-modal.component';
import {CalculatorService} from '../../../../core/services/calculator/calculator.service';
import {of, Subscription, zip} from 'rxjs';
import {CityFrom, CityTo} from '../../../../core/interfaces/calculator';

@Component({
  selector: 'app-coverage-list',
  templateUrl: './coverage-list.component.html',
  styleUrls: ['./coverage-list.component.scss']
})
export class CoverageListComponent implements OnInit, OnDestroy {
  public citiesFrom: any = null;
  public citiesTo: any = null;

  private sub: Subscription;

  constructor(
    private calcService: CalculatorService,
    private modalService: SimpleModalService) { }

  ngOnInit(): void {
    this.sub = zip(
      this.calcService.getCitiesFrom(),
      this.calcService.getCityTo(1, 0))
      .subscribe(([citiesFrom, citiesTo]) => {
        this.citiesFrom = citiesFrom;
        this.citiesTo = citiesTo;
      });
  }

  showCitiesModal(e, title, cities) {
    e.preventDefault();
    this.modalService.addModal(CitiesModalComponent, {
      title,
      list: of(cities)
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
