import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-order-steps',
  templateUrl: './order-steps.component.html',
  styleUrls: ['./order-steps.component.scss']
})
export class OrderStepsComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('stepsEl', {read: ElementRef}) stepsEl: ElementRef;

  @Input() currentStep: number;
  @Input() invalidStep: number;
  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  public steps = ['Автор заявки', 'Отправитель груза', 'Параметры груза', 'Завершение'];
  public previousStep: number;
  public stepNodes;

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.stepNodes = this.stepsEl.nativeElement.children;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const previousStep = changes.currentStep && changes.currentStep.previousValue;
    const currentStep = changes.currentStep && changes.currentStep.currentValue; ;

    if (this.stepNodes && (currentStep > previousStep)) {
      this.stepNodes[previousStep].classList.add('calc-steps__item--done');
    } else if (this.stepNodes && (currentStep < previousStep)) {
      this.stepNodes[previousStep].classList.remove('calc-steps__item--done');
      this.stepNodes[currentStep].classList.remove('calc-steps__item--done');
    }
  }

  setStep(index) {
   this.currentStep = index;
   this.change.emit(index);
  }
}
