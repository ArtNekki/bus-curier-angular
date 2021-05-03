import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-points-list',
  templateUrl: './points-list.component.html',
  styleUrls: ['./points-list.component.scss']
})
export class PointsListComponent implements OnInit {
  public points = [
    {id: 'point-1', title: 'Владивосток, Автовокзал'},
    {id: 'point-2', title: 'Владивосток, Гоголя'},
    {id: 'point-3', title: 'Артем'},
    {id: 'point-4', title: 'Уссурийск', status: 'Только забор'},
    {id: 'point-5', title: 'Уссурийск', status: 'Только забор'},
    {id: 'point-6', title: 'Находка'},
    {id: 'point-7', title: 'Владивосток, Гоголя'},
    {id: 'point-8', title: 'Владивосток, Автовокзал'}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
