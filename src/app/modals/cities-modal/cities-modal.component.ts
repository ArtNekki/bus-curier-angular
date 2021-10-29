import {Component, OnDestroy, OnInit} from '@angular/core';
import {SimpleModalComponent} from 'ngx-simple-modal';
import {FormUtilsService} from '../../core/services/form-utils.service';

export interface CitiesModel {
  cities: Array<any>;
}

@Component({
  selector: 'app-cities-modal',
  templateUrl: './cities-modal.component.html',
  styleUrls: ['./cities-modal.component.scss']
})
export class CitiesModalComponent extends SimpleModalComponent<null, null> implements OnInit, OnDestroy, CitiesModel  {
  public title: string;
  public cities: Array<any>;
  private letters = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К',
                    'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х',
                    'Ц', 'Ч', 'Ш', 'Щ', 'Э', 'Ю', 'Я'];

  public citiesGroups: any;

  constructor(public formUtils: FormUtilsService) {
    super();
  }

  ngOnInit(): void {
    this.cities = this.cities
      .map((city) => {
        return city.name;
      });

    this.citiesGroups = this.letters.reduce((obj: object, letter: string) => {
      return {
        ...obj,
       [letter]: this.cities.filter((city) => city.charAt(0) === letter)
      };
    }, {});

    this.citiesGroups = Object
      .entries(this.citiesGroups)
      .filter((obj: [string, any]) => {
        return obj[1].length;
      });

    this.cities = [this.citiesGroups.splice(0, Math.ceil(this.citiesGroups.length / 2)), this.citiesGroups];
  }

  ngOnDestroy(): void {
  }
}
