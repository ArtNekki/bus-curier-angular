import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnChanges {
  @Input() currentStep;
  @Input() form;
  @Input() pickupInvalid;

  public FormStep = {
    One: 0,
    Two: 1,
    Three: 2,
    Four: 3
  };

  public cargoList;
  public isOrderVisible = false;

  public pickupFormInvalid: boolean;

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.pickupInvalid) {
      this.pickupFormInvalid = changes.pickupInvalid.currentValue;
    }

    if (changes.form) {
      // this.cargoList = this.getCargoList(changes.data.currentValue);
      // console.log('form', changes.form.currentValue);
    }

    // const firstName = changes.data.currentValue.steps[0].author.individual['first-name'];
    //

  }

  // getCargoList(data) {
  //   return data.steps[2]['cargo-group'];
  // }
  showOrder() {
    this.isOrderVisible = true;
  }
}
