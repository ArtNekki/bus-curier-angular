import { Component, OnInit } from '@angular/core';
import cities from '../../../../mock-data/cities';
import formFieldMeta from '../../../../core/form/formFieldMeta';
import fieldError from '../../../../core/form/fieldError';
import FormControlName from 'src/app/core/maps/FormControlName';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UtilsService} from '../../../../core/services/utils.service';
import {RecaptchaComponent, ReCaptchaV3Service} from 'ng-recaptcha';

@Component({
  selector: 'app-index-form-order',
  templateUrl: './index-form-order.component.html',
  styleUrls: ['./index-form-order.component.scss']
})
export class IndexFormOrderComponent implements OnInit {
  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;
  public FormFieldError = fieldError;

  public form: FormGroup;

  constructor(
    public utils: UtilsService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      [FormControlName.Fio]: new FormControl('', [Validators.required]),
      [FormControlName.Tel]: new FormControl('', [Validators.required, Validators.pattern(/((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}/)]),
      [FormControlName.Question]: new FormControl('', [Validators.required]),
      [FormControlName.Agree]: new FormControl(false, [Validators.required]),
      [FormControlName.Captcha]: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    console.log('form', this.form.value);
    this.form.markAllAsTouched();
  }

  captchaResolved(value: string) {

    if (!value) {
      this.form.get(FormControlName.Agree).setValue(false);
    }
  }

  executeCaptcha(captcha) {
    captcha.execute();
    this.form.markAllAsTouched();
  }
}
