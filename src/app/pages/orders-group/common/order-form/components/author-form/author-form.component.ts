import {Component, EventEmitter, forwardRef, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {SimpleModalService} from 'ngx-simple-modal';
import FormControlName from 'src/app/core/maps/FormControlName';
import UserType from 'src/app/core/maps/UserType';
import {AuthService} from '../../../../../../core/services/auth/auth.service';
import {LoginModalComponent} from '../../../../../../modals/login-modal/login-modal.component';
import {SignInModalComponent} from '../../../../../../modals/sign-in-modal/sign-in-modal.component';
import {SubFormComponent} from '../sub-form/sub-form.component';
import fadeIn from '../../../../../../core/animations/fadeIn';
import {AlertModalComponent} from '../../../../../../modals/alert-modal/alert-modal.component';

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.scss'],
  animations: [fadeIn],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AuthorFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AuthorFormComponent),
      multi: true
    }
  ]
})
export class AuthorFormComponent extends SubFormComponent implements OnInit {
  @Output() selectUser: EventEmitter<any> = new EventEmitter<any>();

  public FormControlName = FormControlName;
  public UserType = UserType;

  public formGroup: FormGroup;
  public currentUserType = null;

  constructor(
    private modalService: SimpleModalService,
    private simpleModal: SimpleModalService,
    public authService: AuthService
  ) {
    super();
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      [FormControlName.Active]: new FormControl(FormControlName.Individual),
      individual: new FormControl('', [Validators.required]),
      entity: new FormControl('')
    });

    this.showAlertModal();

    super.ngOnInit();
  }

  setCurrentUserType(type: string) {
    this.currentUserType = type;
    this.selectUser.emit(type);
  }

  showLoginModal(e) {
    e.preventDefault();
    this.modalService.addModal(LoginModalComponent);
  }

  showSignInModal(e) {
    e.preventDefault();
    this.modalService.addModal(SignInModalComponent);
  }

  showAlertModal() {
    this.simpleModal.addModal(AlertModalComponent, {
      message: '?? ???????????? ???????????? ???????????????????? <br /> ???????????????? ???????????? ?????? ??????. ????????'
    }).subscribe(() => {
      // this.close();
    });
  }

  changeUser(type: string) {
    switch (type) {
      case UserType.Individual:
        (this.formGroup.get(UserType.Individual) as FormGroup).setValidators([Validators.required]);
        (this.formGroup.get(UserType.Entity) as FormGroup).clearValidators();
        this.formGroup.get(UserType.Entity).setValue('');
        break;
      case UserType.Entity:
        (this.formGroup.get(UserType.Entity) as FormGroup).setValidators([Validators.required]);
        (this.formGroup.get(UserType.Individual) as FormGroup).clearValidators();
        this.formGroup.get(UserType.Individual).setValue('');
        break;
    }
  }
}
