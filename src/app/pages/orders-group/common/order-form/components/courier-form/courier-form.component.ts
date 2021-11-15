import {Component, forwardRef, OnInit} from '@angular/core';
import formFieldMeta from '../../../../../../core/form/formFieldMeta';
import fieldError from '../../../../../../core/form/fieldError';
import {FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {FormUtilsService} from '../../../../../../core/services/form-utils.service';
import {UtilsService} from '../../../../../../core/services/utils.service';
import {SubFormComponent} from '../sub-form/sub-form.component';
import FormControlName from 'src/app/core/maps/FormControlName';
import schedule from 'src/app/mock-data/schedule';
import {Pattern} from '../../../../../../core/pattern/pattern';

@Component({
  selector: 'app-courier-form',
  templateUrl: './courier-form.component.html',
  styleUrls: ['./courier-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CourierFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CourierFormComponent),
      multi: true
    }
  ]
})
export class CourierFormComponent extends SubFormComponent implements OnInit {
  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;
  public FormFieldError = fieldError;

  public formGroup: FormGroup;
  public schedule = schedule;

  constructor(public formUtils: FormUtilsService,
              public utils: UtilsService) {
    super();
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      [FormControlName.Street]: new FormControl('',
        [Validators.required, Validators.pattern(Pattern.TextWithNumbersAndSymbols),
          Validators.minLength(2)]),
      [FormControlName.Building]: new FormControl('',
        [Validators.required, Validators.pattern(Pattern.TextWithNumbersAndSymbols),
          Validators.minLength(2)]),
      [FormControlName.Apartment]: new FormControl('',
        [Validators.required, Validators.pattern(Pattern.TextWithNumbersAndSymbols),
          Validators.minLength(2)]),
      [FormControlName.CourierTime]: new FormControl('time-1', [])
    });

    // this.formGroup.markAllAsTouched();

    super.ngOnInit();
  }
}
