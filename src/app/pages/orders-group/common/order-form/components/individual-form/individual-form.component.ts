import {Component, forwardRef, OnInit} from '@angular/core';
import formFieldMeta from '../../../../../../core/form/formFieldMeta';
import fieldError from '../../../../../../core/form/fieldError';
import {FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {FormUtilsService} from '../../../../../../core/services/form-utils.service';
import {UtilsService} from '../../../../../../core/services/utils.service';
import {SubFormComponent} from '../sub-form/sub-form.component';
import userRoles from 'src/app/data/user-roles';
import FormControlName from 'src/app/core/maps/FormControlName';

@Component({
  selector: 'app-individual-form',
  templateUrl: './individual-form.component.html',
  styleUrls: ['./individual-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IndividualFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => IndividualFormComponent),
      multi: true
    }
  ]
})
export class IndividualFormComponent extends SubFormComponent implements OnInit {
  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;
  public FormFieldError = fieldError;

  public formGroup: FormGroup;
  public userRoles = userRoles;

  constructor(public formUtils: FormUtilsService,
              public utils: UtilsService) {
    super();
  }

  ngOnInit(): void {

    this.formGroup = new FormGroup({
      [FormControlName.LastName]: new FormControl('', [Validators.required]),
      [FormControlName.FirstName]: new FormControl('', [Validators.required]),
      [FormControlName.MiddleName]: new FormControl('', [Validators.required]),
      [FormControlName.Email]: new FormControl('', [Validators.required, Validators.email]),
      [FormControlName.Tel]: new FormControl('', [Validators.required,
        Validators.pattern(/((\(\d{3}\)?)|(\d{3}-))?\d{3}-\d{4}/)]),
      [FormControlName.Role]: new FormControl(FormControlName.Sender, [Validators.required]),
    });

    super.ngOnInit();

    this.userRoles = userRoles;
  }
}
