import {Component, OnDestroy, OnInit} from '@angular/core';
import {SimpleModalComponent} from 'ngx-simple-modal';
import formFieldMeta from '../../core/form/formFieldMeta';
import fieldError from '../../core/form/fieldError';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import FormControlName from 'src/app/core/maps/FormControlName';
import {UtilsService} from '../../core/services/utils.service';
import UserType from 'src/app/core/maps/UserType';
import {FormUtilsService} from '../../core/services/form-utils.service';
import {OrderFormService} from '../../core/services/order-form/order-form.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent extends SimpleModalComponent<null, null> implements OnInit, OnDestroy {
  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;
  public FormFieldError = fieldError;
  public UserType = UserType;

  public form: FormGroup;
  public currentUserType = null;

  constructor(public formUtils: FormUtilsService,
              public utils: UtilsService) {
    super();
  }

  ngOnInit(): void {
    this.currentUserType = UserType.Individual;

    this.form = new FormGroup({
      [UserType.Individual]: new FormGroup({
        [FormControlName.Fio]: new FormControl('', [Validators.required]),
        [FormControlName.Email]: new FormControl('', [Validators.required, Validators.email]),
        [FormControlName.Tel]: new FormControl('', [Validators.required])
      }),
      [UserType.Entity]: new FormGroup({
        [FormControlName.Email]: new FormControl('', [Validators.required, Validators.email]),
        [FormControlName.Tel]: new FormControl('', [Validators.required])
      })
    });
  }

  ngOnDestroy(): void {
  }

  setCurrentUserType(type: string) {
    this.currentUserType = type;
  }

  onSubmit() {
    console.log('sign-in form', this.form.value);
  }
}
