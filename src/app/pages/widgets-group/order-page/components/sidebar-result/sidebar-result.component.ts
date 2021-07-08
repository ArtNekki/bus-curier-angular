import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-sidebar-result',
  templateUrl: './sidebar-result.component.html',
  styleUrls: ['./sidebar-result.component.scss']
})
export class SidebarResultComponent implements OnInit, OnChanges {
  @Input() currentStep;
  @Input() data;

  public FormStep = {
    One: 0,
    Two: 1,
    Three: 2,
    Four: 3
  };

  public cargoList;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.carrentStep) {
      this.currentStep = changes.currentStep.currentValue;
    }

    if (changes.data) {
      // this.cargoList = this.getCargoList(changes.data.currentValue);
      console.log('cargoList', this.cargoList);
    }

    // const firstName = changes.data.currentValue.steps[0].author.individual['first-name'];
    //

  }

  // getCargoList(data) {
  //   return data.steps[2]['cargo-group'];
  // }
}
