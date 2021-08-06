import {Component, forwardRef, OnDestroy, OnInit} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup, NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';
import FormControlName from 'src/app/core/maps/FormControlName';
import {FormUtilsService} from '../../../../../../core/services/form-utils.service';
import {UtilsService} from '../../../../../../core/services/utils.service';
import fieldError from '../../../../../../core/form/fieldError';
import formFieldMeta from '../../../../../../core/form/formFieldMeta';
import {BasicGroupComponent} from '../basic-group/basic-group.component';
import {OrderFormService} from '../../../../../../core/services/order-form/order-form.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-recipient',
  templateUrl: './recipient.component.html',
  styleUrls: ['./recipient.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RecipientComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => RecipientComponent),
      multi: true
    }
  ]
})
export class RecipientComponent extends BasicGroupComponent implements OnInit, OnDestroy {
  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;
  public FormFieldError = fieldError;

  public formSub: Subscription;
  public formGroup: FormGroup;

  constructor(public formUtils: FormUtilsService,
              public utils: UtilsService,
              orderForm: OrderFormService) {
    super(orderForm);
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      [FormControlName.Fio]: new FormControl('', [Validators.required]),
      [FormControlName.Tel]: new FormControl('', [Validators.required])
    });

    this.formSub = this.form$.subscribe((form: FormGroup) => {
      const isIndividual = form.value.steps[0].author.active === FormControlName.Individual;
      const isRecipient = form.value.steps[0].author.individual.role === FormControlName.Recipient;

      if (isIndividual && isRecipient) {

        const individual = form.value.steps[0].author.individual;

        this.formGroup.get(FormControlName.Fio)
          .patchValue([
            individual[FormControlName.LastName],
            individual[FormControlName.FirstName],
            individual[FormControlName.MiddleName]
          ].join(` `));
        this.formGroup.get(FormControlName.Tel).patchValue(individual.tel);
      }
    });

    super.ngOnInit();
  }

  ngOnDestroy(): void {
    this.formSub.unsubscribe();
  }
}
