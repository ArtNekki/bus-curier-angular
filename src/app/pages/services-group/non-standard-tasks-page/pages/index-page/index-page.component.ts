import {Component, OnDestroy, OnInit} from '@angular/core';
import formFieldMeta from '../../../../../core/form/formFieldMeta';
import fieldError from '../../../../../core/form/fieldError';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UtilsService} from '../../../../../core/services/utils.service';
import FormControlName from 'src/app/core/maps/FormControlName';
import {SimpleModalService} from 'ngx-simple-modal';
import { CommonService } from 'src/app/core/services/common/common.service';
import {environment} from '../../../../../../environments/environment';
import {take} from 'rxjs/operators';
import {AlertModalComponent} from '../../../../../modals/alert-modal/alert-modal.component';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent implements OnInit, OnDestroy {
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
      [FormControlName.Tel]: new FormControl('',
        [Validators.required, Validators.pattern(/((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}/)]),
      [FormControlName.Agree]: new FormControl(''),
      [FormControlName.Captcha]: new FormControl('', [Validators.required])
    });

    document.body.classList.add('non-standard-tasks');
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
      phone: data.tel
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

  ngOnDestroy(): void {
    document.body.classList.remove('non-standard-tasks');
  }
}
