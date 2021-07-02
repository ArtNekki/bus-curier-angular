import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-personal-data-page',
  templateUrl: './account-personal-data-page.component.html',
  styleUrls: ['./account-personal-data-page.component.scss']
})
export class AccountPersonalDataPageComponent implements OnInit {
  public auth = [
    {name: 'Логин:', value: 'tafibuchgalter@mail.ru'},
    {name: 'Пароль:', value: '********'}];

  public organization = [
    {name: 'Наименование:', value: 'Тафи-диагностика МЛ, ООО'},
    {name: 'Руководитель:', value: 'Думнов Эдуард'},
    {name: 'Телефон:', value: '+79046296359'},
    {name: 'ИНН:', value: '2536242157'},
    {name: 'КПП:', value: '253601001'},
    {name: 'ОГРН:', value: '1112536006593'},
    {name: 'Банк:', value: 'ПАО АКБ Приморье'},
    {name: 'Р/с:', value: '40702810100142923801'},
    {name: 'К/с:', value: '30101810800000000795'},
    {name: '№ договора:', value: '30'},
    {name: 'Дата договора:', value: '30 01.08.2013'},
    {name: 'Перевозчик:', value: '21'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
