import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-cities-block',
  templateUrl: './cities-block.component.html',
  styleUrls: ['./cities-block.component.scss']
})
export class CitiesBlockComponent implements OnInit {
  @Input() letter: string;
  @Input() list: any;

  constructor() { }

  ngOnInit(): void {
  }

}
