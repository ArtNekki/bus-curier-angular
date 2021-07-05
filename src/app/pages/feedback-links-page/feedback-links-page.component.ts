import { Component, OnInit } from '@angular/core';

const links = [
  {text: 'Как отправить посылку', href: '#'},
  {text: 'Как получить посылку', href: '#'},
  {text: 'Правила приемки и отправки грузов', href: '#'},
  {text: 'Тарифы на перевозку', href: '#'},
  {text: 'Упаковки грузов и виды упаковки', href: '#'},
  {text: 'Хранение груза', href: '#'},
  {text: 'Доставка грузов и багажа из Аэропорта', href: '#'}
];

@Component({
  selector: 'app-feedback-links-page',
  templateUrl: './feedback-links-page.component.html',
  styleUrls: ['./feedback-links-page.component.scss']
})
export class FeedbackLinksPageComponent implements OnInit {
  public links = links;

  constructor() { }

  ngOnInit(): void {
  }

}
