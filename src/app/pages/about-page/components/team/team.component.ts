import { Component, OnInit } from '@angular/core';

const list = [
  'проводим планерки',
  'совместные выезды',
  'обучение и тренинги',
  'интересные и яркие корпоративы'
];

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  public list = list;

  constructor() { }

  ngOnInit(): void {
  }

}
