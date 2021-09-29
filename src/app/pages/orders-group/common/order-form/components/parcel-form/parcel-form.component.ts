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
  @Input() departure: any;
  @Input() pickup: any;

  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;
  public isInvalid = false;

  public formGroup: FormGroup;

  private valueSub: Subscription;
  private maxParamsSum = 250;

  private Cities = {
    Vanino: ['1675', '1885', '414', '1756', '1615', '1775', '1932'],
    SovGavan: ['1676', '1888', '1759', '1824', '1933'],
    Dalnegorsk: ['754', '192', '4', '12', '1783', '101'],
    Olga: ['1627', '207', '30', '235', '119', '1808', '180'],
  };

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

    this.setLimit();
    this.formGroup.markAllAsTouched();
    this.formGroup.markAsTouched();
    this.onTouched();

    super.ngOnInit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.departure && changes.departure.currentValue) {
      this.departure = changes.departure.currentValue;
    }

    if (changes.pickup && changes.pickup.currentValue) {
      this.pickup = changes.pickup.currentValue;
    }

    console.log('changes', changes.pickup);

    if (this.formGroup) {
      this.setLimit();
      // this.toggleDimensionsError(this.formGroup.value);
      this.formGroup.reset(this.formGroup.value);
      this.formGroup.markAllAsTouched();
    }
  }

  setLimit() {
    if (this.pickup.courier || this.departure.courier) {
      this.formGroup.get(FormControlName.Weight)
        .setValidators([Validators.max(30), Validators.required, Validators.min(1)]);
      this.maxParamsSum = 130;
    } else {
      this.formGroup.get(FormControlName.Weight)
        .setValidators([Validators.max(100), Validators.required, Validators.min(1)]);
      this.maxParamsSum = 250;
    }
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
