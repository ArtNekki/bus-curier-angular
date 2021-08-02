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
import {BasicGroupComponent} from '../basic-group/basic-group.component';
import {OrderFormService} from '../../../../../../core/services/order-form/order-form.service';

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
export class CargoGroupComponent extends BasicGroupComponent implements OnInit  {
  public FormControlName = FormControlName;

  public formGroup: FormGroup;
  public currentCargoIndex = 0;

  constructor(public formUtils: FormUtilsService,
              public utils: UtilsService,
              orderForm: OrderFormService) {
    super(orderForm);
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      activeItem: new FormControl(0),
      items: new FormArray([
        new FormControl('')
      ])
    });

    super.ngOnInit();
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

  writeValue(value: any): void {

    if (value) {
      this.items.clear();
      value.items.forEach(item => this.items.push(new FormControl(item)));
    }

    super.writeValue(value);
  }
}
