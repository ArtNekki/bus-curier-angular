import {ChangeDetectorRef, Component, forwardRef, OnDestroy, OnInit} from '@angular/core';
import formFieldMeta from '../../../../../../core/form/formFieldMeta';
import fieldError from '../../../../../../core/form/fieldError';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {FormUtilsService} from '../../../../../../core/services/form-utils.service';
import {UtilsService} from '../../../../../../core/services/utils.service';
import {OrderFormService} from '../../../../../../core/services/order-form/order-form.service';
import {SubFormComponent} from '../sub-form/sub-form.component';
import FormControlName from 'src/app/core/maps/FormControlName';
import userDocs from 'src/app/data/user-docs';
import fadeIn from '../../../../../../core/animations/fadeIn';

@Component({
  selector: 'app-sender-form',
  templateUrl: './sender-form.component.html',
  styleUrls: ['./sender-form.component.scss'],
  animations: [fadeIn],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SenderFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SenderFormComponent),
      multi: true
    }
  ]
})
export class SenderFormComponent extends SubFormComponent implements OnInit, OnDestroy {
  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;
  public FormFieldError = fieldError;

  public formSub: Subscription;
  public formGroup: FormGroup;

  public userDocs = userDocs;
  public isOtherUserDoc = false;

  constructor(public formUtils: FormUtilsService,
              public utils: UtilsService,
              private readonly cdr: ChangeDetectorRef,
              orderForm: OrderFormService) {
    super(orderForm);
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      [FormControlName.Fio]: new FormControl('', [Validators.required]),
      [FormControlName.Doc]: new FormControl(FormControlName.RusPassport, [Validators.required]),
      [FormControlName.Tel]: new FormControl('', [Validators.required]),
    });

    this.changeUserDoc(this.formGroup.get(FormControlName.Doc).value);

    this.formSub = this.form$.subscribe((form: FormGroup) => {
      const isIndividual = form.value.steps[0].author.active === FormControlName.Individual;
      const isSender = form.value.steps[0].author.individual.role === FormControlName.Sender;

      if (isIndividual && isSender) {

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

  changeUserDoc(type: any) {
    switch (type) {
      case FormControlName.RusPassport:
        this.formGroup.setControl(FormControlName.RusPassport, new FormControl('', [Validators.required]));
        this.formGroup.removeControl(FormControlName.DriverLicense);
        this.isOtherUserDoc = false;
        break;
      case FormControlName.DriverLicense:
        this.formGroup.setControl(FormControlName.DriverLicense, new FormControl('', [Validators.required]));
        this.formGroup.removeControl(FormControlName.RusPassport);
        this.isOtherUserDoc = false;
        break;
      case FormControlName.Other:
        this.formGroup.removeControl(FormControlName.RusPassport);
        this.formGroup.removeControl(FormControlName.DriverLicense);
        this.isOtherUserDoc = true;
        break;
    }
  }
}
