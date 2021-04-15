import {Component, Input, OnInit} from '@angular/core';

interface Icon {
  name: string;
  width: number;
  height: number;
}

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  @Input() icons: Array<Icon>;

  constructor() { }

  ngOnInit(): void {
  }


}
