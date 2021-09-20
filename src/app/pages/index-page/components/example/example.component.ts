import {Component, Input, OnInit} from '@angular/core';
import {Example} from '../../../../core/interfaces/common';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit {
  @Input() data: Example;

  constructor() { }

  ngOnInit(): void {
  }
}
