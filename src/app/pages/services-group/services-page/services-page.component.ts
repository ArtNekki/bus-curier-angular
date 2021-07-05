import { Component, OnInit } from '@angular/core';

const links = [
  {text: 'Поиск заказа', href: '#'},
  {text: 'Личный кабинет', href: '#'},
  {text: 'Онлайн-заявка', href: '#'},
  {text: 'Расчет тарифа по Приморью', href: '#'},
  {text: 'Расчет тарифа по Республике Татарстан', href: '#'},
  {text: 'Расчет тарифа по России', href: '#'}
];

@Component({
  selector: 'app-services-page',
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.scss']
})
export class ServicesPageComponent implements OnInit {
  public links = links;

  constructor() { }

  ngOnInit(): void {
  }

}
