import {ChangeDetectionStrategy, Component, forwardRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {FormUtilsService} from '../../../../../../core/services/form-utils.service';
import FormControlName from '../../../../../../core/maps/FormControlName';
import {SubFormComponent} from '../sub-form/sub-form.component';
import formFieldMeta from '../../../../../../core/form/formFieldMeta';
import {CourierMode} from '../../../../../../core/interfaces/calculator';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-parcel-form',
  templateUrl: './parcel-form.component.html',
  styleUrls: ['./parcel-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ParcelFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ParcelFormComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParcelFormComponent extends SubFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() courier: CourierMode;

  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;
  public isInvalid = false;

  public formGroup: FormGroup;
  public pickup: boolean;
  public delivery: boolean;

  private valueSub: Subscription;

  private maxParamsSum = 250;

  constructor(
    public formUtils: FormUtilsService) {
    super();
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      [FormControlName.PlaceCount]:
        new FormControl(1, [Validators.required, Validators.min(1)]),
      [FormControlName.Weight]:
        new FormControl( '',
          [Validators.required, Validators.min(1), Validators.max(100)]),
      [FormControlName.Width]:
        new FormControl( '',
            [Validators.required, Validators.min(1)]),
      [FormControlName.Height]:
        new FormControl( '',
          [Validators.required, Validators.min(1)]),
      [FormControlName.Length]:
        new FormControl( '',
          [Validators.required, Validators.min(1)])
    });

    this.valueSub = this.formGroup.valueChanges.subscribe((parcel) => {
      this.toggleDimensionsError(parcel);
    });

    this.formGroup.markAllAsTouched();
    this.formGroup.markAsTouched();
    this.onTouched();

    super.ngOnInit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.pickup = changes.courier.currentValue.pickup;
    this.delivery = changes.courier.currentValue.delivery;

    if (this.formGroup) {

      if (this.pickup || this.delivery) {
        this.formGroup.get(FormControlName.Weight).setValidators(Validators.max(30));
      } else {
        this.formGroup.get(FormControlName.Weight).setValidators(Validators.max(100));
      }

      this.formGroup.reset(this.formGroup.value);
      this.formGroup.markAllAsTouched();

    }

    //
    // console.log('this.pickup', this.pickup);
    // console.log('this.delivery', this.delivery);
  }

  toggleDimensionsError(parcel) {
    const dimensions = Object.entries(parcel)
      .filter(([key, value]) => {
        return !(key === FormControlName.PlaceCount || key === FormControlName.Weight);
      });

    const params = dimensions.reduce((obj: {width: number, height: number, length: number}, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {width: 0, height: 0, length: 0});

    const paramsSum = dimensions
      .reduce((total: number, [key, value]) => {
        return total += +value;
      }, 0);

    if (paramsSum > this.maxParamsSum) {
      this.formGroup.setErrors({dimensions: { incorrect: true, diff: paramsSum - this.maxParamsSum}});
      this.formGroup.markAllAsTouched();
    } else {
      this.formGroup.setErrors(null);
    }
  }

  ngOnDestroy(): void {
    if (this.valueSub) {
      this.valueSub.unsubscribe();
    }
  }

}
