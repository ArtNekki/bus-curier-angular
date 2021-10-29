import {Component, OnDestroy, OnInit} from '@angular/core';
import {SimpleModalComponent} from 'ngx-simple-modal';
import {FormUtilsService} from '../../core/services/form-utils.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
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
  public list: any;
  private letters = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К',
                    'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х',
                    'Ц', 'Ч', 'Ш', 'Щ', 'Э', 'Ю', 'Я'];

  public cities: any;
  public searchField: FormControl;

  constructor(public formUtils: FormUtilsService) {
    super();
  }

  ngOnInit(): void {
    this.searchField = new FormControl('', []);

    this.list
      .pipe(
        map((cities: Array<CityFrom> | any) => {
            return cities
              .map((city) => city.name);
        }),
        map((cities: Array<CityFrom> | any) => {
          return cities
            .filter((city) => {
              return city.toLowerCase().includes(this.searchField.value.toLowerCase());
            });
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
      .subscribe((cities) => {
        this.cities = [cities.splice(0, Math.ceil(cities.length / 2)), cities];
      });

    // this.cities = this.cities
    //   .map((city) => {
    //     return city.name;
    //   });
    //
    // this.citiesGroups = this.letters.reduce((obj: object, letter: string) => {
    //   return {
    //     ...obj,
    //    [letter]: this.cities.filter((city) => city.charAt(0) === letter)
    //   };
    // }, {});
    //
    // this.citiesGroups = Object
    //   .entries(this.citiesGroups)
    //   .filter((obj: [string, any]) => {
    //     return obj[1].length;
    //   });
    //
    // this.cities = [this.citiesGroups.splice(0, Math.ceil(this.citiesGroups.length / 2)), this.citiesGroups];

    this.searchField.valueChanges
      .pipe()
      .subscribe((value) => {
          console.log('value', value);
          // console.log('cities', this.cities);
      });
  }

  ngOnDestroy(): void {
  }

  searchCity($event: Event) {
    console.log('$event', $event);
  }
}
