import {ChangeDetectorRef, Component, EventEmitter, forwardRef, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {SimpleModalService} from 'ngx-simple-modal';
import FormControlName from 'src/app/core/maps/FormControlName';
import UserType from 'src/app/core/maps/UserType';
import {AuthService} from '../../../../../../core/services/auth/auth.service';
import {OrderFormService} from '../../../../../../core/services/order-form/order-form.service';
import {LoginComponent} from '../../../../../../modals/login/login.component';
import {SignInComponent} from '../../../../../../modals/sign-in/sign-in.component';
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
    public authService: AuthService,
    private cdr: ChangeDetectorRef,
    orderForm: OrderFormService
  ) {
    super(orderForm);
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
    this.modalService.addModal(LoginComponent);
  }

  showSignInModal(e) {
    e.preventDefault();
    this.modalService.addModal(SignInComponent);
  }

  showAlertModal() {
    this.simpleModal.addModal(AlertModalComponent, {
      message: 'В данный момент оформление <br /> доступно только для физ. лица'
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

    // this.cdr.detectChanges();
  }
}
