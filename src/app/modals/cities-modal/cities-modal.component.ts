import {Component, OnDestroy, OnInit} from '@angular/core';
import {SimpleModalComponent} from 'ngx-simple-modal';
import {FormUtilsService} from '../../core/services/form-utils.service';
import {FormControl} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {map, mergeMap, startWith} from 'rxjs/operators';
import {CityFrom} from '../../core/interfaces/calculator';

export interface CitiesModel {
  list: Array<any>;
}

@Component({
  selector: 'app-cities-modal',
  templateUrl: './cities-modal.component.html',
  styleUrls: ['./cities-modal.component.scss']
})
export class CitiesModalComponent extends SimpleModalComponent<null, null> implements OnInit, OnDestroy, CitiesModel  {
  public title: string;
  public list: Array<CityFrom> | any;
  private letters = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К',
                    'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х',
                    'Ц', 'Ч', 'Ш', 'Щ', 'Э', 'Ю', 'Я'];

  public cities: Array<CityFrom> | any;
  public searchField: FormControl;

  private sub: Subscription;

  constructor(public formUtils: FormUtilsService) {
    super();
  }

  ngOnInit(): void {
    this.searchField = new FormControl('', []);

    this.sub = this.searchField.valueChanges
      .pipe(
        startWith(this.searchField.value),
        mergeMap((search: string) => {
          return this.list
            .pipe(
              map((cities: Array<CityFrom> | any) => {
                return cities.filter((city) => {
                  return city.name.toLowerCase().includes(search.toLowerCase());
                });
              })
            );
        }),
        map((cities: Array<CityFrom> | any) => {
            return cities
              .map((city) => city.name);
        }),
        map((cities: Array<CityFrom> | any) => {
          return this.letters.reduce((obj: object, letter: string) => {
              return {
                ...obj,
               [letter]: cities.filter((city) => city.charAt(0) === letter)
              };
            }, {});
        }),
        map((cities: Array<CityFrom> | any) => {
          return Object
            .entries(cities)
            .filter((obj: [string, any]) => {
              return obj[1].length;
            });
        }),
      )
      .subscribe((cities: Array<CityFrom> | any) => {
        this.cities = [cities.splice(0, Math.ceil(cities.length / 2)), cities];
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
