import {Component, OnDestroy, OnInit} from '@angular/core';
import {SimpleModalComponent, SimpleModalService} from 'ngx-simple-modal';
import formFieldMeta from '../../core/form/formFieldMeta';
import fieldError from '../../core/form/fieldError';
import FormControlName from 'src/app/core/maps/FormControlName';
import {UtilsService} from '../../core/services/utils.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SignInModalComponent} from '../sign-in-modal/sign-in-modal.component';
import {AuthService} from '../../core/services/auth/auth.service';
import {Router} from '@angular/router';
import firebase from 'firebase';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent extends SimpleModalComponent<null, null> implements OnInit, OnDestroy  {
  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;
  public FormFieldError = fieldError;

  public form: FormGroup;

  constructor(
    public utils: UtilsService,
    private modalService: SimpleModalService,
    private auth: AuthService,
    private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      [FormControlName.Email]: new FormControl('', [Validators.required]),
      [FormControlName.Password]: new FormControl('**********', [Validators.required]),
      [FormControlName.Remember]: new FormControl('')
    });
  }

  ngOnDestroy(): void {
  }

  showSignInModal(e) {
    e.preventDefault();
    this.modalService.addModal(SignInModalComponent);
  }

  onSubmit() {
    const user = this.form.value;

    this.auth.login(user).subscribe((response) => {
      this.close();
    });
  }
}
