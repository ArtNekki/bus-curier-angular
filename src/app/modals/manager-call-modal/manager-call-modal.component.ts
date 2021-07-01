import {Component, OnDestroy, OnInit} from '@angular/core';
import {SimpleModalComponent, SimpleModalService} from 'ngx-simple-modal';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import formFieldMeta from '../../core/form/formFieldMeta';
import fieldError from '../../core/form/fieldError';
import FormControlName from 'src/app/core/maps/FormControlName';
import {FormUtilsService} from '../../core/services/form-utils.service';
import {UtilsService} from '../../core/services/utils.service';

@Component({
  selector: 'app-manager-call-modal',
  templateUrl: './manager-call-modal.component.html',
  styleUrls: ['./manager-call-modal.component.scss']
})
export class ManagerCallModalComponent extends SimpleModalComponent<null, null> implements OnInit, OnDestroy {
  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;
  public FormFieldError = fieldError;

  public form: FormGroup;

  constructor(public formUtils: FormUtilsService,
              public utils: UtilsService) {
    super();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
        [FormControlName.Tel]: new FormControl('', [Validators.required]),
        [FormControlName.FirstName]: new FormControl('', [Validators.required]),
        [FormControlName.Agree]: new FormControl('', [Validators.required, Validators.email])
    });
  }

  ngOnDestroy(): void {
  }

  onSubmit() {
    console.log('manager call', this.form.value);
    this.close();
  }
}
