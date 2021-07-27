import {Component, forwardRef, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {
  AbstractControl,
  ControlValueAccessor, FormArray,
  FormControl,
  FormGroup, NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';
import FormControlName from 'src/app/core/maps/FormControlName';
import formFieldMeta from '../../../../../../core/form/formFieldMeta';
import {FormUtilsService} from '../../../../../../core/services/form-utils.service';
import {OrderFormService} from '../../../../../../core/services/order-form/order-form.service';
import {BasicGroupComponent} from '../basic-group/basic-group.component';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ServicesComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ServicesComponent),
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
export class ServicesComponent extends BasicGroupComponent implements OnInit {
  public FormControlName = FormControlName;
  public FormFieldMeta = formFieldMeta;

  public formGroup: FormGroup;
  public currentService: string;

  constructor(public formUtils: FormUtilsService,
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
  }

  // showService(service: string) {
  //   this.currentService = service;
  // }
}
