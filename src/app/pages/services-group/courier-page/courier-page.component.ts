import { Component, OnInit } from '@angular/core';

const list = [
  [
    'Владивосток (забор и доставка груза)',
    'Уссурийск (забор и доставка груза)',
    'Находка (забор и доставка груза)',
    'Дальнегорск (только доставка груза)'
  ],
  [
    'на сайте, в разделе <a href=\'#\' class=\'link link--blue link--no-underline link--in-text\'><span class=\'link__text\'>«Отследить посылку»</span></a>',
    'при отправлении посылки оформить дополнительную <br>услугу «смс-уведомление отправителю»;',
    'позвонить по номеру телефона: <a href=\'tel: 8(423)2937879\' class=\'link link--blue link--no-underline link--in-text\'><span class=\'link__text\'>8 (423) 293 78 79</span></a>'
  ]
];

@Component({
  selector: 'app-courier-page',
  templateUrl: './courier-page.component.html',
  styleUrls: ['./courier-page.component.scss']
})
export class CourierPageComponent implements OnInit {
  public list = list;

  constructor() { }

  ngOnInit(): void {
  }

}
