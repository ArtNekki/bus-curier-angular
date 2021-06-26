import {Component, forwardRef, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup, NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ServicesComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ServicesComponent),
      multi: true
    }
  ],
  animations: [trigger('panel', [
    transition('void => *', [
      style({opacity: 0}),
      animate('200ms')
    ])
  ])]
})
export class ServicesComponent implements OnInit, ControlValueAccessor, Validator {
  public Service = {
    Insurance: 'insurance',
    SmsForSender: 'sms-for-sender',
    SmsForRecipient: 'sms-for-recipient'
  };

  public formGroup: FormGroup;
  public currentService: string;

  constructor() { }

  ngOnInit(): void {
    this.currentService = this.Service.Insurance;

    this.formGroup = new FormGroup({
      [this.Service.Insurance]: new FormControl(''),
      [this.Service.SmsForSender]: new FormControl(''),
      [this.Service.SmsForRecipient]: new FormControl('')
    });
  }

  showService(service: string) {
    this.currentService = service;
  }

  public onTouched: () => void = () => {};

  writeValue(value: any): void {
    if (value) {
      this.formGroup.setValue(value, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.formGroup.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  // setDisabledState?(isDisabled: boolean): void {
  //   isDisabled ? this.formGroup.disable() : this.formGroup.enable();
  // }

  validate(c: AbstractControl): ValidationErrors | null {
    return this.formGroup.valid ? null : { invalidForm: {valid: false, message: 'packaging are invalid'}};
  }
}
