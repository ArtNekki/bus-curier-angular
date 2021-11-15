import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import Region from '../../../../../core/maps/Region';
import City from '../../../../../core/maps/City';
import fadeIn from '../../../../../core/animations/fadeIn';

@Component({
  selector: 'app-regions-box',
  templateUrl: './regions-box.component.html',
  styleUrls: ['./regions-box.component.scss'],
  animations: [fadeIn]
})
export class RegionsBoxComponent implements OnInit {
  @Output() changeCity: EventEmitter<any> = new EventEmitter<any>();

  public Region = Region;

  public currentRegion;
  public currentCity;

  public regions = [
    {id: Region.Primorye, name: 'Приморский край'},
    {id: Region.Khabarovsk, name: 'Хабаровский край'}
  ];

  public cities = {
    [Region.Primorye]: [
      {id: City.Vladivostok, name: 'Владивосток'},
      {id: City.Ussuriysk, name: 'Уссурийск'},
      {id: City.Artem, name: 'Артем'},
      {id: City.Nahodka, name: 'Находка'},
      {id: City.Dalnegorsk, name: 'Дальнегорск'},
    ],
    [Region.Khabarovsk]: [
      {id: City.Khabarovsk, name: 'Хабаровск'},
    ]
  };

  constructor() { }

  ngOnInit(): void {
    this.currentRegion = Region.Primorye;
    this.currentCity = City.Vladivostok;
  }

  setCurrentRegion(id) {
    this.currentRegion = id;
  }

  setCurrentCity(id) {
    this.currentCity = id;
    this.changeCity.emit(id);
  }
}
