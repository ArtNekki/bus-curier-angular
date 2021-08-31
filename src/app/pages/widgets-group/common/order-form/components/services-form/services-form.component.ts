import {Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import formFieldMeta from '../../../../../../core/form/formFieldMeta';
import {FormArray, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {FormUtilsService} from '../../../../../../core/services/form-utils.service';
import {OrderFormService} from '../../../../../../core/services/order-form/order-form.service';
import {SubFormComponent} from '../sub-form/sub-form.component';
import FormControlName from 'src/app/core/maps/FormControlName';
import {animate, style, transition, trigger} from '@angular/animations';
import {delay, switchMap, tap} from 'rxjs/operators';
import {CalculatorService} from '../../../../../../core/services/calculator/calculator.service';
import {UtilsService} from '../../../../../../core/services/utils.service';
import Service from '../../../../../../core/models/Service';

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
export class ServicesFormComponent extends SubFormComponent implements OnInit, OnChanges {
  @Input() cityFromId: string;

  public FormControlName = FormControlName;
  public FormFieldMeta = formFieldMeta;

  public formGroup: FormGroup;
  public currentService: string;
  public activeCheckboxId: string;
  public formattedData = {};
  public isLoading = false;

  constructor(public formUtils: FormUtilsService,
              public utils: UtilsService,
              private calcService: CalculatorService,
              orderForm: OrderFormService) {
    super(orderForm);
  }

  ngOnInit(): void {

    this.formGroup = new FormGroup({
      items: new FormArray([])
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.cityFromId && changes.cityFromId.currentValue) {
      this.setServices(changes.cityFromId.currentValue);
    }
  }

  setServices(id: string) {
    this.calcService.getServices(id).pipe(
      tap(() => {
        this.isLoading = true;
        this.items.clear();
      }),
      // delay(5000)
    ).subscribe((arr: Array<Service>) => {
      this.isLoading = false;

      arr.filter((item: Service) => item.group_id === '3')
        .forEach((item: Service) => {
          this.formattedData[item.id] = {
            name: item.name,
            site_name: item.site_name,
            params: item.property,
            price: item.price
          };

          if (this.checkSms(item.name)) {
            this.items.push(new FormGroup({
              [item.id]: new FormControl(''),
              [FormControlName.Tel]: new FormControl('', {updateOn: 'blur'})
            }));
          } else if (this.checkInsurance(item.name)) {
            this.items.push(new FormGroup({
              [item.id]: new FormControl(''),
              [FormControlName.Sum]: new FormControl('', {updateOn: 'blur'})
            }));
          }});
    });
  }

  public get items(): FormArray {
    return this.formGroup.get('items') as FormArray;
  }

  checkSms(name: string) {
    return name.indexOf('СМС') !== -1;
  }

  checkInsurance(name: string) {
    return name.indexOf('Страхование') !== -1;
  }

  getCheckbox(i: number, arr: any) {
    return Object.values((arr[i] as FormGroup).controls)[0];
  }

  setActiveCheckbox(id: string) {
    this.activeCheckboxId = id;
  }
}
