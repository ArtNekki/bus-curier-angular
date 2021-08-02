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
import {map} from 'rxjs/operators';
import FormControlName from 'src/app/core/maps/FormControlName';
import cities from 'src/app/mock-data/cities';
import {OrderFormService} from '../../../../../../core/services/order-form/order-form.service';
import {BasicGroupComponent} from '../basic-group/basic-group.component';

@Component({
  selector: 'app-auto-parts',
  templateUrl: './auto-parts.component.html',
  styleUrls: ['./auto-parts.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutoPartsComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AutoPartsComponent),
      multi: true
    }
  ]
})
export class AutoPartsComponent extends BasicGroupComponent implements OnInit  {
  public FormControlName = FormControlName;

  public formGroup: FormGroup;
  public cities = cities;

  constructor(orderForm: OrderFormService) {
    super(orderForm);
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      parts: new FormArray([
        new FormControl('')
      ])
    });

    super.ngOnInit();
  }

  public get parts(): FormArray {
    return this.formGroup.get('parts') as FormArray;
  }

  add() {
    this.parts.push(new FormControl(''));
  }

  delete(index: number) {
    if (this.parts.length <= 1) {
      return;
    }

    this.parts.removeAt(index);
  }

  writeValue(value: any): void {
    if (value) {
      this.parts.clear();
      value.forEach(item => this.parts.push(new FormControl(item)));
    }
  }

  registerOnChange(fn: any): void {
    this.formGroup.valueChanges.pipe( map(value => value.parts)).subscribe(fn);
  }
}
