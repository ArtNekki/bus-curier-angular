import {ChangeDetectorRef, Component, forwardRef, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {SimpleModalService} from 'ngx-simple-modal';
import {OrderFormService} from '../../../../../../core/services/order-form/order-form.service';
import {ConfirmModalComponent} from '../../../../../../modals/confirm-modal/confirm-modal.component';
import {map} from 'rxjs/operators';
import cities from 'src/app/mock-data/cities';
import FormControlName from 'src/app/core/maps/FormControlName';
import {SubFormComponent} from '../sub-form/sub-form.component';

@Component({
  selector: 'app-auto-parts-form',
  templateUrl: './auto-parts-form.component.html',
  styleUrls: ['./auto-parts-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutoPartsFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AutoPartsFormComponent),
      multi: true
    }
  ]
})
export class AutoPartsFormComponent extends SubFormComponent implements OnInit {
  public FormControlName = FormControlName;

  public formGroup: FormGroup;
  public cities = cities;

  constructor(
    private cdr: ChangeDetectorRef,
    private simpleModal: SimpleModalService,
    orderForm: OrderFormService) {
    super(orderForm);
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      parts: new FormArray([
        new FormControl('', [Validators.required])
      ])
    });

    this.formGroup.markAllAsTouched();

    super.ngOnInit();
  }

  public get parts(): FormArray {
    return this.formGroup.get('parts') as FormArray;
  }

  get isSomePartsInvalid() {
    return this.parts.controls.some((control) => {
      return control.invalid;
    });
  }

  add() {
    this.parts.push(new FormControl('', [Validators.required]));
    this.formGroup.markAllAsTouched();
  }

  delete(index: number) {
    if (this.parts.length <= 1) {
      return;
    }

    if (this.parts.value[index]) {
      this.confirm().subscribe((ok) => {
        if (!ok) {
          return;
        }

        this.parts.removeAt(index);
        this.cdr.detectChanges();
      });
    } else {
      this.parts.removeAt(index);
    }
  }

  confirm() {
    return this.simpleModal.addModal(ConfirmModalComponent, {
      message: `Вы уверены? <br /> Данные будут потеряны.`
    });
  }

  writeValue(value: any): void {
    if (value) {
      this.parts.clear();
      value.forEach(item => this.parts.push(new FormControl(item, [Validators.required])));
    }
  }

  registerOnChange(fn: any): void {
    this.formGroup.valueChanges.pipe( map(value => value.parts)).subscribe(fn);
  }
}
