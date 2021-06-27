import {Component, forwardRef, OnInit} from '@angular/core';
import formFieldMeta from '../../../../../../core/form/formFieldMeta';
import fieldError from '../../../../../../core/form/fieldError';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup, NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';
import {FormUtilsService} from '../../../../../../core/services/form-utils.service';
import {UtilsService} from '../../../../../../core/services/utils.service';
import FormControlName from 'src/app/core/maps/FormControlName';
import addressPoints from 'src/app/mock-data/address-points';

@Component({
  selector: 'app-pickup-point',
  templateUrl: './pickup-point.component.html',
  styleUrls: ['./pickup-point.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PickupPointComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PickupPointComponent),
      multi: true
    }
  ]
})
export class PickupPointComponent implements OnInit, ControlValueAccessor, Validator {
  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;
  public FormFieldError = fieldError;

  public formGroup: FormGroup;
  public addressPoints = addressPoints;
  public Tab = {One: 'tab-1', Two: 'tab-2'};
  public currentTab = null;

  constructor(public formUtils: FormUtilsService,
              public utils: UtilsService) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      [FormControlName.Location]: new FormControl('', []),
      [FormControlName.AddressPoints]: new FormControl('', []),
      [FormControlName.ReceiveData]: new FormGroup({
        [FormControlName.Department]: new FormControl(''),
        [FormControlName.Courier]: new FormControl('')
      })
    });

    this.currentTab = this.Tab.One;
  }

  setCurrentTab(tab: string) {
    this.currentTab = tab;
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
    return this.formGroup.valid ? null : { invalidForm: {valid: false, message: 'recipient are invalid'}};
  }
}
