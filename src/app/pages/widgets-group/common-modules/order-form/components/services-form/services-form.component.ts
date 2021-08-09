import {Component, forwardRef, OnInit} from '@angular/core';
import formFieldMeta from '../../../../../../core/form/formFieldMeta';
import {FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {FormUtilsService} from '../../../../../../core/services/form-utils.service';
import {OrderFormService} from '../../../../../../core/services/order-form/order-form.service';
import {SubFormComponent} from '../sub-form/sub-form.component';
import FormControlName from 'src/app/core/maps/FormControlName';
import {animate, style, transition, trigger} from '@angular/animations';

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
}
