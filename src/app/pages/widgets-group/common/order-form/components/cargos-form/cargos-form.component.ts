import {Component, forwardRef, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {FormUtilsService} from '../../../../../../core/services/form-utils.service';
import {UtilsService} from '../../../../../../core/services/utils.service';
import {OrderFormService} from '../../../../../../core/services/order-form/order-form.service';
import {SubFormComponent} from '../sub-form/sub-form.component';
import FormControlName from 'src/app/core/maps/FormControlName';

@Component({
  selector: 'app-cargos-form',
  templateUrl: './cargos-form.component.html',
  styleUrls: ['./cargos-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CargosFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CargosFormComponent),
      multi: true
    }
  ]
})
export class CargosFormComponent extends SubFormComponent implements OnInit {
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
      activeItem: new FormControl(0, [Validators.required]),
      items: new FormArray([
        new FormControl('', [Validators.required])
      ])
    });

    this.formGroup.markAllAsTouched();

    super.ngOnInit();
  }

  public get items(): FormArray {
    return this.formGroup.get('items') as FormArray;
  }

  addCargo() {
    if (this.isSomeControlInvalid) {
      return;
    }

    this.items.push(new FormControl('', [Validators.required]));
    this.formGroup.get('activeItem').setValue(this.items.length - 1);
  }

  deleteCargo(index: number) {
    this.items.removeAt(index);
    this.formGroup.get('activeItem').setValue(this.items.length - 1);
  }

  get isSomeControlInvalid() {
    return this.items.controls.some((control) => control.invalid);
  }

  writeValue(value: any): void {

    if (value) {
      this.items.clear();
      value.items.forEach(item => this.items.push(new FormControl(item)));
    }

    super.writeValue(value);
  }

  changeCargo($event: any) {
    // console.log('event', $event);
    // $event.preventDefault();
  }
}
