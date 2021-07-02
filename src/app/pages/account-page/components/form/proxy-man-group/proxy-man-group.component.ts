import {Component, forwardRef, OnInit} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormArray,
  FormControl,
  FormGroup, NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';
import FormControlName from 'src/app/core/maps/FormControlName';
import {FormUtilsService} from '../../../../../core/services/form-utils.service';
import {UtilsService} from '../../../../../core/services/utils.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-proxy-man-group',
  templateUrl: './proxy-man-group.component.html',
  styleUrls: ['./proxy-man-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProxyManGroupComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ProxyManGroupComponent),
      multi: true
    }
  ]
})
export class ProxyManGroupComponent implements OnInit, ControlValueAccessor, Validator {
  public FormControlName = FormControlName;

  public form: FormGroup;
  public currentIndex = 0;

  constructor(public formUtils: FormUtilsService,
              public utils: UtilsService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      items: new FormArray([
        new FormControl('')
      ])
    });
  }

  public get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  addCargo() {
    this.items.push(new FormControl(''));
    this.currentIndex = this.items.length - 1;
  }

  deleteItem(index: number) {
    this.items.removeAt(index);
    this.currentIndex = this.items.length - 1;
  }

  selectItem(index: number) {
    this.currentIndex = index;
  }

  public onTouched: () => void = () => {};

  writeValue(value: any): void {
    if (value) {
      this.items.clear();
      value.forEach(item => this.items.push(new FormControl(item)));
    }
  }

  registerOnChange(fn: any): void {
    this.form.valueChanges.pipe( map(value => value.items)).subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  // setDisabledState?(isDisabled: boolean): void {
  //   isDisabled ? this.parcelGroup.disable() : this.parcelGroup.enable();
  // }

  validate(c: AbstractControl): ValidationErrors | null {
    return this.form.valid ? null : { invalidForm: {valid: false, message: 'fields are invalid'}};
  }

  onSubmit() {
    console.log('proxy men', this.form.value);
  }
}
