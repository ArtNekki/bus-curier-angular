import {Component, forwardRef, OnInit} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor, FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator, Validators
} from '@angular/forms';
import FormControlName from 'src/app/core/maps/FormControlName';
import {OrderFormService} from '../../../../../../core/services/order-form/order-form.service';
import {BasicGroupComponent} from '../basic-group/basic-group.component';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DocsComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DocsComponent),
      multi: true
    }
  ]
})
export class DocsComponent extends BasicGroupComponent implements OnInit {
  public FormControlName = FormControlName;
  public formGroup: FormGroup;

  constructor(orderForm: OrderFormService) {
    super(orderForm);
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      [FormControlName.PlaceCount]: new FormControl('', [Validators.required, Validators.min(1)])
    });

    super.ngOnInit();
  }
}
