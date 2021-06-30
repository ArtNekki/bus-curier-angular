import {Component, OnDestroy, OnInit} from '@angular/core';
import {SimpleModalComponent} from 'ngx-simple-modal';
import formFieldMeta from '../../core/form/formFieldMeta';
import fieldError from '../../core/form/fieldError';
import FormControlName from 'src/app/core/maps/FormControlName';
import {UtilsService} from '../../core/services/utils.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent extends SimpleModalComponent<null, null> implements OnInit, OnDestroy  {
  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;
  public FormFieldError = fieldError;

  public form: FormGroup;

  constructor(public utils: UtilsService) {
    super();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      [FormControlName.Login]: new FormControl('', [Validators.required]),
      [FormControlName.Password]: new FormControl('**********', [Validators.required]),
      [FormControlName.Remember]: new FormControl('')
    });
  }

  ngOnDestroy(): void {
  }

  onSubmit() {
    console.log('authorization form', this.form.value);
  }
}
