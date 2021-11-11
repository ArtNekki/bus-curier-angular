import {Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import formFieldMeta from '../../../../../../core/form/formFieldMeta';
import {FormArray, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {FormUtilsService} from '../../../../../../core/services/form-utils.service';
import {SubFormComponent} from '../sub-form/sub-form.component';
import FormControlName from 'src/app/core/maps/FormControlName';
import {animate, style, transition, trigger} from '@angular/animations';
import {UtilsService} from '../../../../../../core/services/utils.service';
import {Service} from '../../../../../../core/interfaces/calculator';

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
export class ServicesFormComponent extends SubFormComponent implements OnInit {
  @Input() services: Array<Service> = [];

  public FormControlName = FormControlName;
  public FormFieldMeta = formFieldMeta;

  public formGroup: FormGroup;
  public activeCheckboxId: string;
  public formattedData = {};

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

    this.formGroup.valueChanges.subscribe((data) => {
      data.items.forEach((item, i) => {

        if (Object.values(item)[0]) {
          this.items.at(i).setValidators(Validators.required);
        } else {
          this.items.at(i).clearValidators();
        }

      });
    });

    this.setServices(this.services);
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes.services && changes.services.currentValue.length && this.formGroup) {
  //     this.items.clear();
  //     this.setServices(changes.services.currentValue);
  //   }
  // }

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
            this.items.push(new FormGroup({
              [item.id]: new FormControl(''),
              [FormControlName.Tel]: new FormControl('', {updateOn: 'blur'})
            }));
            break;
          case this.Service.INSURANCE:
            const insurance = new FormGroup({
              ['insurance']: new FormControl(''),
              [FormControlName.Sum]: new FormControl('')
            });

            this.items.push(insurance);

            insurance.valueChanges.subscribe((data) => {
              const sum = +data.sum.split(' ').join('');

              if (sum > this.Insurance.LIMIT_MIN) {
                this.insuranceSum = this.Insurance.PRICE_MAX;
              } else {
                this.insuranceSum = this.Insurance.PRICE_MIN;
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
}
