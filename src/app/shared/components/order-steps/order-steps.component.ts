import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-order-steps',
  templateUrl: './order-steps.component.html',
  styleUrls: ['./order-steps.component.scss']
})
export class OrderStepsComponent implements OnInit {
  @Input() currentStep: number;
  @Input() invalidStep: number;
  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  public steps = ['Автор заявки', 'Отправитель груза', 'Параметры груза', 'Завершение'];
  // public currentStep = 0;

  constructor() { }

  ngOnInit(): void {
  }

  setStep(index) {
   this.currentStep = index;
   this.change.emit(index);
  }
}
