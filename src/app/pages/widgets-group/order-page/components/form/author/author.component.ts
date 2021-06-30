import {Component, forwardRef, OnInit} from '@angular/core';
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
import {AuthorizationComponent} from '../../../../../../modals/authorization/authorization.component';


@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss'],
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
export class AuthorComponent implements OnInit, ControlValueAccessor, Validator {
  public UserType = UserType;

  public formGroup: FormGroup;
  public currentUserType = null;

  constructor(private modalService: SimpleModalService) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      individual: new FormControl(''),
      entity: new FormControl('')
    });

    this.currentUserType = UserType.Individual;
  }

  setCurrentUserType(type: string) {
    this.currentUserType = type;
  }

  showAuthorizationModal(e) {
    e.preventDefault();
    console.log('authoriz', AuthorizationComponent);
    this.modalService.addModal(AuthorizationComponent);
  }

  showRegisterModal() {

  }

  public onTouched: () => void = () => {};

  writeValue(value: any): void {
    if (value) {
      this.formGroup.setValue(value, { emitEvent: false });
    }
    // this.cdr.detectChanges();
    // this.cdr.markForCheck();
    // this.formGroup.markAllAsTouched();
  }

  registerOnChange(fn: any): void {
    this.formGroup.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  // setDisabledState?(isDisabled: boolean): void {
  //   isDisabled ? this.formGroup.disable() : this.formGroup.enable();
  // }

  validate(c: AbstractControl): ValidationErrors | null {
    return this.formGroup.valid ? null : { invalidForm: {valid: false, message: 'recipient are invalid'}};
  }
}
