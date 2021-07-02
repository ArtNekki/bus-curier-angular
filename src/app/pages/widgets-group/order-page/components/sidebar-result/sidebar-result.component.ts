import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-sidebar-result',
  templateUrl: './sidebar-result.component.html',
  styleUrls: ['./sidebar-result.component.scss']
})
export class SidebarResultComponent implements OnInit, OnChanges {
  @Input() currentStep;

  public FormStep = {
    One: 0,
    Two: 1,
    Three: 2,
    Four: 3
  };

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.currentStep = changes.currentStep.currentValue;
  }
}
