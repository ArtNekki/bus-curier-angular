import {Component, OnDestroy, OnInit} from '@angular/core';
import {SimpleModalComponent, SimpleModalService} from 'ngx-simple-modal';
import formFieldMeta from '../../core/form/formFieldMeta';
import fieldError from '../../core/form/fieldError';
import FormControlName from 'src/app/core/maps/FormControlName';
import {UtilsService} from '../../core/services/utils.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RegistrationComponent} from '../registration/registration.component';

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

  constructor(
    public utils: UtilsService,
    private modalService: SimpleModalService) {
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

  showRegistrationModal(e) {
    e.preventDefault();
    this.modalService.addModal(RegistrationComponent);
  }

  onSubmit() {
    console.log('authorization form', this.form.value);
  }
}
