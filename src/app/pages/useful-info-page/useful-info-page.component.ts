import { Component, OnInit } from '@angular/core';

const links = [
  {text: 'Как отправить посылку', href: '/info/how-to-send'},
  {text: 'Как получить посылку', href: '/info/how-to-get'},
  {text: 'Правила приемки и отправки грузов', href: '/info/rules-of-send'},
  {text: 'Тарифы на перевозку', href: '/info/transportation-rates'},
  {text: 'Упаковки грузов и виды упаковки', href: '/info/packing'},
  {text: 'Хранение груза', href: '/info/storage-cargo'},
  {text: 'Доставка грузов и багажа из Аэропорта', href: '/info/delivery-from-airport'}
];

@Component({
  selector: 'app-useful-info-page',
  templateUrl: './useful-info-page.component.html',
  styleUrls: ['./useful-info-page.component.scss']
})
export class UsefulInfoPageComponent implements OnInit {

  public links = links;

  constructor() { }

  ngOnInit(): void {
  }

}
