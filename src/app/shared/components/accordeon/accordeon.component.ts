import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-accordeon',
  templateUrl: './accordeon.component.html',
  styleUrls: ['./accordeon.component.scss']
})
export class AccordeonComponent implements OnInit {
  @Input() data;

  constructor() { }

  ngOnInit(): void {
  }

}
