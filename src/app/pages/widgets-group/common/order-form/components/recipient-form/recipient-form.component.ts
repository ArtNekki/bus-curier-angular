import {Component, forwardRef, OnDestroy, OnInit} from '@angular/core';
import formFieldMeta from '../../../../../../core/form/formFieldMeta';
import fieldError from '../../../../../../core/form/fieldError';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {FormUtilsService} from '../../../../../../core/services/form-utils.service';
import {UtilsService} from '../../../../../../core/services/utils.service';
import {OrderFormService} from '../../../../../../core/services/order-form/order-form.service';
import {SubFormComponent} from '../sub-form/sub-form.component';
import FormControlName from 'src/app/core/maps/FormControlName';

@Component({
  selector: 'app-recipient-form',
  templateUrl: './recipient-form.component.html',
  styleUrls: ['./recipient-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RecipientFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => RecipientFormComponent),
      multi: true
    }
  ]
})
export class RecipientFormComponent extends SubFormComponent implements OnInit, OnDestroy {
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
