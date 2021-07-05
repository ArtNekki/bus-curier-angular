import { Component, OnInit } from '@angular/core';

const list = [
  'Мы гарантируем, 100 % возмещение убытков в течение 30 <br>календарных дней с момента подачи заявления о наступлении <br />страхового случая.',
  'Страхование грузов осуществляется только при наличии <br>обеспечения сохранности груза упаковкой.',
  'Страховым случаем не является потеря груза.',
  'Выплаты осуществляются по объявленной ценности груза, не <br>превышающей его реальную стоимость.'
];

@Component({
  selector: 'app-cargo-insurance-page',
  templateUrl: './cargo-insurance-page.component.html',
  styleUrls: ['./cargo-insurance-page.component.scss']
})
export class CargoInsurancePageComponent implements OnInit {
  public list = list;

  constructor() { }

  ngOnInit(): void {
  }

}
