import { Component, OnInit } from '@angular/core';
import cities from '../../mock-data/cities';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import formFieldMeta from '../../core/form/formFieldMeta';
import fieldError from '../../core/form/fieldError';
import FormControlName from 'src/app/core/maps/FormControlName';
import {FormUtilsService} from '../../core/services/form-utils.service';
import {UtilsService} from '../../core/services/utils.service';
import {AlertModalComponent} from '../../modals/alert-modal/alert-modal.component';
import {SimpleModalService} from 'ngx-simple-modal';
import { CommonService } from 'src/app/core/services/common/common.service';
import {environment} from '../../../environments/environment';
import {take} from 'rxjs/operators';
import {Pattern} from '../../core/pattern/pattern';

@Component({
  selector: 'app-feedback-page',
  templateUrl: './feedback-page.component.html',
  styleUrls: ['./feedback-page.component.scss']
})
export class FeedbackPageComponent implements OnInit {
  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;
  public FormFieldError = fieldError;

  public form: FormGroup;
  public isLoading = false;

  public cities = cities;

  public FeedbackType = {
    Question: 'question',
    Review: 'review',
    Note: 'note',
    Coop: 'coop'
  };

  constructor(public formUtils: FormUtilsService,
              public utils: UtilsService,
              private simpleModal: SimpleModalService,
              private commonService: CommonService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      [FormControlName.FirstName]: new FormControl('',
        [Validators.required, Validators.pattern(Pattern.Text),
          Validators.minLength(2)]),
      [FormControlName.Tel]: new FormControl('',
        [Validators.required, Validators.pattern(Pattern.Phone)]),
      [FormControlName.Location]: new FormControl('', [Validators.required]),
      [FormControlName.Email]: new FormControl('',
        [Validators.required, Validators.email]),
      [FormControlName.Question]: new FormControl('',
        [Validators.required, Validators.pattern(Pattern.TextWithNumbersAndSymbols),
        Validators.minLength(2)]),
      [FormControlName.Type]: new FormControl(this.FeedbackType.Question, [Validators.required]),
      [FormControlName.Agree]: new FormControl('', []),
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
      sender: data.FirstName,
      phone: data.tel,
      email: '',
      message: data.question
    })
      .pipe(take(1))
      .subscribe(() => {
          this.isLoading = false;
          this.alert('Ваше сообщение отправлено!<br /> Мы свяжемся с Вами в ближайшее время!')
            .pipe(take(1))
            .subscribe(() => {
              this.form.reset();
              this.form.get(FormControlName.Type).setValue(this.FeedbackType.Question);
            });
        },
        (error) => {
          this.isLoading = false;
          this.alert('Ой, что-то пошло не так!<br /> Сообщение не было отправлено!', 'Понятно!')
            .pipe(take(1))
            .subscribe(() => {});
        });
  }

  setType(value: string) {
    this.form.get(FormControlName.Type).setValue(value);
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
