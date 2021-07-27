import {Component, EventEmitter, forwardRef, OnInit, Output} from '@angular/core';
import UserType from 'src/app/core/maps/UserType';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup, NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';
import {SimpleModalService} from 'ngx-simple-modal';
import {LoginComponent} from '../../../../../../modals/login/login.component';
import {SignInComponent} from '../../../../../../modals/sign-in/sign-in.component';
import {AuthService} from '../../../../../../core/services/auth/auth.service';
import FormControlName from 'src/app/core/maps/FormControlName';
import fadeIn from '../../../../../../core/animations/fadeIn';
import {BasicGroupComponent} from '../basic-group/basic-group.component';
import {OrderFormService} from '../../../../../../core/services/order-form/order-form.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss'],
  animations: [fadeIn],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AuthorComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AuthorComponent),
      multi: true
    }
  ]
})
export class AuthorComponent extends BasicGroupComponent implements OnInit {
  @Output() selectUser: EventEmitter<any> = new EventEmitter<any>();

  public FormControlName = FormControlName;
  public UserType = UserType;

  public formGroup: FormGroup;
  public currentUserType = null;

  constructor(
    private modalService: SimpleModalService,
    public authService: AuthService,
    orderForm: OrderFormService
    ) {
    super(orderForm);
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      [FormControlName.Active]: new FormControl(''),
      individual: new FormControl(''),
      entity: new FormControl('')
    });
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

  changeUser(type: string) {
    switch (type) {
      case UserType.Individual:
        this.formGroup.get(UserType.Entity).setValue('');
        break;
      case UserType.Entity:
        this.formGroup.get(UserType.Individual).setValue('');
        break;
    }
  }
}
