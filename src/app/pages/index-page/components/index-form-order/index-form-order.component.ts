import { Component, OnInit } from '@angular/core';
import cities from '../../../../mock-data/cities';
import formFieldMeta from '../../../../core/form/formFieldMeta';
import fieldError from '../../../../core/form/fieldError';
import FormControlName from 'src/app/core/maps/FormControlName';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UtilsService} from '../../../../core/services/utils.service';
import {RecaptchaComponent, ReCaptchaV3Service} from 'ng-recaptcha';
import { CommonService } from 'src/app/core/services/common/common.service';
import {environment} from '../../../../../environments/environment';
import {AlertModalComponent} from '../../../../modals/alert-modal/alert-modal.component';
import {take} from 'rxjs/operators';
import {SimpleModalService} from 'ngx-simple-modal';

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
  public isLoading = false;

  constructor(
    public utils: UtilsService,
    private simpleModal: SimpleModalService,
    private commonService: CommonService) { }

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
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;

    const data = this.form.value;

    this.commonService.sendMail({
     'api-key': environment.api_key,
      sender: data.fio,
      phone: data.tel,
      email: '',
      message: data.message
    })
    .pipe(take(1))
    .subscribe(() => {
      this.isLoading = false;
      this.alert('Ваше сообщение отправлено!<br /> Мы свяжемся с Вами в ближайшее время!')
        .pipe(take(1))
        .subscribe(() => {
          this.form.reset();
        });
    },
    (error) => {
      this.isLoading = false;
      this.alert('Ой, что-то пошло не так!<br /> Сообщение не было отправлено!', 'Понятно!')
        .pipe(take(1))
        .subscribe(() => {});
    });
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

  alert(message, btnText = null) {
    return this.simpleModal.addModal(AlertModalComponent, {
      message,
      btnText
    });
  }
}
