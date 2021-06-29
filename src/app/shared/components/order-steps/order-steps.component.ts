import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-order-steps',
  templateUrl: './order-steps.component.html',
  styleUrls: ['./order-steps.component.scss']
})
export class OrderStepsComponent implements OnInit, OnChanges {
  @Input() currentStep: number;
  @Input() invalidStep: number;
  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  public steps = ['Автор заявки', 'Отправитель груза', 'Параметры груза', 'Завершение'];
  public previousStep: number;

  constructor() { }

  ngOnInit(): void {
    // this.previousStep = this.currentStep - 1;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.previousStep = changes.currentStep.previousValue;
  }

  setStep(index) {
   this.currentStep = index;
   this.change.emit(index);
  }
}
