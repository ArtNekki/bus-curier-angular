import {Component, forwardRef, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {
  AbstractControl,
  ControlValueAccessor, FormArray,
  FormControl,
  FormGroup, NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';
import FormControlName from 'src/app/core/maps/FormControlName';
import formFieldMeta from '../../../../../../core/form/formFieldMeta';
import {FormUtilsService} from '../../../../../../core/services/form-utils.service';
import {OrderFormService} from '../../../../../../core/services/order-form/order-form.service';

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
  public FormControlName = FormControlName;
  public FormFieldMeta = formFieldMeta;

  public formGroup: FormGroup;
  public currentService: string;

  constructor(public formUtils: FormUtilsService,
              private orderForm: OrderFormService) { }

  ngOnInit(): void {
    // this.currentService = this.Service.Insurance;

    this.formGroup = new FormGroup({
      [FormControlName.Insurance]: new FormGroup({
        [FormControlName.Active]: new FormControl(''),
        [FormControlName.Sum]: new FormControl('', { updateOn: 'blur' })
      }),
      [FormControlName.SmsForSender]: new FormGroup({
        [FormControlName.Active]: new FormControl(''),
        [FormControlName.Tel]: new FormControl('', { updateOn: 'blur' })
      }),
      [FormControlName.SmsForRecipient]: new FormGroup({
        [FormControlName.Active]: new FormControl(''),
        [FormControlName.Tel]: new FormControl('', { updateOn: 'blur' })
      })
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
