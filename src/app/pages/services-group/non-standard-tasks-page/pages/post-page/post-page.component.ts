import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

const articles = [
  {
    title: 'Доставка цветов из аэропорта по Приморскому краю за 24 часа',
    text: 'Крупная оптовая компания поставщик цветов из Москвы запросила ' +
      'организовать поставку своей продукции из аэропорта г. Владивосток в 21 населенный пункт.'
  },
  {
    title: 'Подарки для близких, которые сейчас далеко',
    text: 'В «BUS-Курьер» поступила заявка на доставку спортивного велосипеда из Владивостока в Находку. Но столь большой\n' +
      'груз нужно было не только забрать у отправителя...'
  },
  {
    title: 'Доставим даже в тайгу',
    text: 'С нестандартной задачей обратился клиент, который поехал на охоту в Лазовский район. В тайге у него сломалась машина,\n' +
      'а подходящей запчасти в округе не нашлось...'
  },
];

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  public data;

  constructor(
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.data = articles[params.id];
    });
  }

}
