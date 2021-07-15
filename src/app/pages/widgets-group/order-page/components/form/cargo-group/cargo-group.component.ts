import {Component, forwardRef, OnInit} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormArray,
  FormControl,
  FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';
import FormControlName from 'src/app/core/maps/FormControlName';
import {FormUtilsService} from '../../../../../../core/services/form-utils.service';
import {UtilsService} from '../../../../../../core/services/utils.service';

@Component({
  selector: 'app-cargo-group',
  templateUrl: './cargo-group.component.html',
  styleUrls: ['./cargo-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CargoGroupComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CargoGroupComponent),
      multi: true
    }
  ]
})
export class CargoGroupComponent implements OnInit, ControlValueAccessor, Validator {
  public FormControlName = FormControlName;

  public formGroup: FormGroup;
  public currentCargoIndex = 0;

  constructor(public formUtils: FormUtilsService,
              public utils: UtilsService) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      activeItem: new FormControl(0),
      items: new FormArray([
        new FormControl('')
      ])
    });
  }

  public get items(): FormArray {
    return this.formGroup.get('items') as FormArray;
  }

  addCargo() {
    this.items.push(new FormControl(''));
    this.formGroup.get('activeItem').setValue(this.items.length - 1);
  }

  deleteCargo(index: number) {
    this.items.removeAt(index);
    this.formGroup.get('activeItem').setValue(this.items.length - 1);
  }

  public onTouched: () => void = () => {};

  writeValue(value: any): void {
    if (value) {
      this.items.clear();
      value.items.forEach(item => this.items.push(new FormControl(item)));
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
  //   isDisabled ? this.parcelGroup.disable() : this.parcelGroup.enable();
  // }

  validate(c: AbstractControl): ValidationErrors | null {
    console.log("Basic Info validation", c);
    return this.formGroup.valid ? null : { invalidForm: {valid: false, message: "basicInfoForm fields are invalid"}};
  }
}
