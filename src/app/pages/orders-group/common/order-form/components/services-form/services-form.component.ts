import {ChangeDetectorRef, Component, forwardRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import formFieldMeta from '../../../../../../core/form/formFieldMeta';
import {FormArray, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {FormUtilsService} from '../../../../../../core/services/form-utils.service';
import {SubFormComponent} from '../sub-form/sub-form.component';
import FormControlName from 'src/app/core/maps/FormControlName';
import {animate, style, transition, trigger} from '@angular/animations';
import {UtilsService} from '../../../../../../core/services/utils.service';
import {Service} from '../../../../../../core/interfaces/calculator';
import {Pattern} from '../../../../../../core/pattern/pattern';
import {delay, pairwise, startWith, take} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-services-form',
  templateUrl: './services-form.component.html',
  styleUrls: ['./services-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ServicesFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ServicesFormComponent),
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
export class ServicesFormComponent extends SubFormComponent implements OnInit, OnDestroy {
  @Input() services: Array<Service> = [];

  public FormControlName = FormControlName;
  public FormFieldMeta = formFieldMeta;

  public formGroup: FormGroup;
  public activeCheckboxId: string;
  public formattedData = {};

  private phoneGroupSub: Subscription;
  private insuranceGroupSub: Subscription;

  Service = {
    SMS: '66',
    EXT_SMS: '65',
    INSURANCE_15: '58',
    INSURANCE_30: '59',
    INSURANCE: 'insurance'
  };

  public Insurance = {
    LIMIT_MIN: 15000,
    PRICE_MIN: 50,
    PRICE_MAX: 100
  };

  public insuranceSum = this.Insurance.PRICE_MIN;

  constructor(public formUtils: FormUtilsService,
              public utils: UtilsService) {
    super();
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      items: new FormArray([])
    });

    this.setServices(this.services);
  }

  setServices(arr: Array<Service>) {

    arr.map((service: Service) => {
      if (service.id === this.Service.INSURANCE_15 || service.id === this.Service.INSURANCE_30) {
        service.id = 'insurance';
      }
    });

    const services = [...new Set(arr.map((service: Service) => service.id))]
      .map((id: string) => {
        const obj = arr.find((service: Service) => service.id === id);

        return Object.assign({}, obj, {
          name: obj.id === this.Service.INSURANCE ? 'Страхование' : obj.name
        });
      });

    services.filter((item: Service) => item.group_id === '3')
      .forEach((item: Service) => {
        this.formattedData[item.id] = {
          name: item.name,
          site_name: item.site_name,
          params: item.property,
          price: item.price
        };

        switch (item.id) {
          case this.Service.SMS:
          case this.Service.EXT_SMS:
            const phoneGroup = new FormGroup({
              [item.id]: new FormControl(false),
              [FormControlName.Tel]: new FormControl('')
            });

            this.items.push(phoneGroup);

            phoneGroup.valueChanges
              .pipe(
                startWith(phoneGroup.value),
                pairwise()
              )
              .subscribe(([prev, next]) => {
                if (Object.values(next)[0]) {
                  phoneGroup.get(FormControlName.Tel).setValidators([Validators.required,
                    Validators.pattern(Pattern.Phone)]);
                } else {
                  phoneGroup.get(FormControlName.Tel).clearValidators();
                }

                // if previous checkbox's key or value not equal next key or value then form reset
                if ((Object.keys(prev)[0] !== Object.keys(next)[0])
                  || Object.values(prev)[0] !== Object.values(next)[0]) {

                  setTimeout(() => {
                    phoneGroup.markAllAsTouched();
                    phoneGroup.reset(phoneGroup.value);
                  }, 0);
                }
            });

            break;
          case this.Service.INSURANCE:
            const insuranceGroup = new FormGroup({
              ['insurance']: new FormControl(false),
              [FormControlName.Sum]: new FormControl('')
            });

            this.items.push(insuranceGroup);

            insuranceGroup.valueChanges
              .pipe(
                startWith(insuranceGroup.value),
                pairwise()
              )
              .subscribe(([prev, next]) => {
                const sum = +next.sum.split(' ').join('');

                if (sum > this.Insurance.LIMIT_MIN) {
                  this.insuranceSum = this.Insurance.PRICE_MAX;
                } else {
                  this.insuranceSum = this.Insurance.PRICE_MIN;
                }

                if (Object.values(next)[0]) {
                  insuranceGroup.get(FormControlName.Sum).setValidators([Validators.required]);
                } else {
                  insuranceGroup.get(FormControlName.Sum).clearValidators();
                }

                // if previous checkbox's key or value not equal next key or value then form reset
                if ((Object.keys(prev)[0] !== Object.keys(next)[0])
                  || Object.values(prev)[0] !== Object.values(next)[0]) {

                  setTimeout(() => {
                    insuranceGroup.markAllAsTouched();
                    insuranceGroup.reset(insuranceGroup.value);
                  }, 0);
                }
            });
        }});
  }

  public get items(): FormArray {
    return this.formGroup.get('items') as FormArray;
  }

  getCheckbox(i: number, arr: any) {
    return Object.values((arr[i] as FormGroup).controls)[0];
  }

  setActiveCheckbox(id: string) {
    this.activeCheckboxId = id;
  }

  ngOnDestroy(): void {
    this.phoneGroupSub.unsubscribe();
    this.insuranceGroupSub.unsubscribe();
  }
}
