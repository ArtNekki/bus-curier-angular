import {Component, OnDestroy, OnInit} from '@angular/core';
import cities from '../../../../mock-data/cities';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import formFieldMeta from '../../../../core/form/formFieldMeta';
import fieldError from '../../../../core/form/fieldError';
import FormControlName from 'src/app/core/maps/FormControlName';
import {map} from 'rxjs/operators';
import {CalculatorService} from '../../../../core/services/calculator/calculator.service';
import {Subscription} from 'rxjs';
import fadeIn from '../../../../core/animations/fadeIn';
import {ConfirmModalComponent} from '../../../../modals/confirm-modal/confirm-modal.component';
import {SimpleModalService} from 'ngx-simple-modal';
import {Router} from '@angular/router';
import {CityFrom, CityTo} from '../../../../core/interfaces/calculator';
import {Select} from '../../../../core/interfaces/form';

const Department = {
  Aleutskaya: '15',
  Gogolya: '7'
};

@Component({
  selector: 'app-index-form-calculator',
  templateUrl: './index-form-calculator.component.html',
  styleUrls: ['./index-form-calculator.component.scss'],
  animations: [fadeIn]
})
export class IndexFormCalculatorComponent implements OnInit, OnDestroy {
  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;
  public FormFieldError = fieldError;

  public cities = cities;
  public form: FormGroup;
  public step = {
    from: 0,
    to: 0
  };

  public citiesFrom = [];
  private citiesFromSub: Subscription;

  public citiesTo = [];
  private citiesToSub: Subscription;

  public currentCityFrom: string;
  public currentCityTo: string;

  constructor(
    private calcService: CalculatorService,
    private simpleModal: SimpleModalService,
    private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      [FormControlName.CityFrom]: new FormControl('', [Validators.required]),
      [FormControlName.CityTo]: new FormControl('', [Validators.required]),
    });

    this.citiesFromSub = this.calcService.getCitiesFrom()
      .pipe(
        map<CityFrom, Select>((cities: any) => {
          return cities
            .filter((city) => city.site_id !== Department.Aleutskaya && city.site_id !== Department.Gogolya)
            .map((city) => {
              // this.cityData[city.id] = city;
              return {value: city.id, name: city.name};
            });
        })
      )
      .subscribe((cities: any) => {
        this.citiesFrom = [{value: '0', name: 'Выберите город'}, ...cities];

        setTimeout(() => {
          this.form.get(FormControlName.CityFrom).setValue(this.citiesFrom[0].value);
        }, 0);
      });
  }

  setCityFrom(id: string) {
    this.currentCityFrom = id;

    if (id) {
      this.getCityTo(id);
    }
  }

  setCityTo(id: string) {
    this.currentCityTo = id;
  }

  getCityTo(id: string) {
    this.citiesToSub = this.calcService.getCityTo(id, 0)
      .pipe(
        map<CityTo, Select>((cities: any) => {
          return cities
            .map((city) => {
              return {value: city.id, name: city.name};
            });
        })
      )
      .subscribe((cities: any) => {
        if (cities.length) {
          this.citiesTo = [{value: '0', name: 'Выберите город'}, ...cities];
        }
      });
  }

  sentData(cityFromId, cityToId) {
    this.simpleModal.addModal(ConfirmModalComponent, {
      message: 'Вы будете перенаправлены<br> на страницу расчета. Продолжить?'
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.router.navigate(['orders', 'quick-order', 'new'],
          { queryParams: { cityFromId, cityToId }});
      } else {

      }
    });
  }

  ngOnDestroy(): void {
    if (this.citiesFromSub) {
      this.citiesFromSub.unsubscribe();
    }

    if (this.citiesToSub) {
      this.citiesToSub.unsubscribe();
    }
  }

  onSubmit() {
    this.form.markAllAsTouched();

    if (this.currentCityFrom && this.currentCityTo) {
      this.sentData(this.currentCityFrom, this.currentCityTo);
    }
  }

}
