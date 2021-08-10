import {Component, forwardRef, OnInit} from '@angular/core';
import formFieldMeta from '../../../../../../core/form/formFieldMeta';
import {FormArray, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {FormUtilsService} from '../../../../../../core/services/form-utils.service';
import {OrderFormService} from '../../../../../../core/services/order-form/order-form.service';
import {SubFormComponent} from '../sub-form/sub-form.component';
import FormControlName from 'src/app/core/maps/FormControlName';
import {animate, style, transition, trigger} from '@angular/animations';
import {switchMap} from 'rxjs/operators';
import {CalculatorService} from '../../../../../../core/services/calculator/calculator.service';
import {UtilsService} from '../../../../../../core/services/utils.service';

interface Service {
  id: string;
  name: string;
  price: string;
  group_id: string;
}

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
  public FormControlName = FormControlName;
  public FormFieldMeta = formFieldMeta;

  public formGroup: FormGroup;
  public currentService: string;

  constructor(public formUtils: FormUtilsService,
              public utils: UtilsService,
              private calcService: CalculatorService,
              orderForm: OrderFormService) {
    super(orderForm);
  }

  ngOnInit(): void {

    this.formGroup = new FormGroup({
      [FormControlName.Insurance]: new FormGroup({
        [FormControlName.Active]: new FormControl(''),
        [FormControlName.Sum]: new FormControl('', { updateOn: 'blur' })
      }),
      [FormControlName.SmsForSender]: new FormGroup({
        [FormControlName.Active]: new FormControl(''),
        [FormControlName.Tel]: new FormControl('', { updateOn: 'blur' })
      }),
      [FormControlName.SmsForRecipient]: new FormGroup({
        [FormControlName.Active]: new FormControl(''),
        [FormControlName.Tel]: new FormControl('', { updateOn: 'blur' })
      })
    });

    this.orderForm.cityFrom$.pipe(
      switchMap((id: string) => {
        return this.calcService.getServices(id);
      })
    ).subscribe((arr: Array<Service>) => {
      arr.filter((item: Service) => item.group_id === '3')
        .forEach((item: Service) => {
          // this.formattedData[item.id] = { name: item.name, price: item.price };
          console.log('service', item);
          // this.formGroup.addControl(item.id, new FormGroup({
          //   [FormControlName.Active]: new FormControl(''),
          //   [FormControlName.Tel]: new FormControl('')
          // }));
        });


    });
  }
}
