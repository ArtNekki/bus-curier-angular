import {Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import formFieldMeta from '../../../../../../core/form/formFieldMeta';
import fieldError from '../../../../../../core/form/fieldError';
import {FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {FormUtilsService} from '../../../../../../core/services/form-utils.service';
import {UtilsService} from '../../../../../../core/services/utils.service';
import FormControlName from 'src/app/core/maps/FormControlName';
import {SubFormComponent} from '../sub-form/sub-form.component';
import {Select} from '../../../../../../core/interfaces/form';
import {of} from 'rxjs';
import {delay, take} from 'rxjs/operators';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DepartmentFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DepartmentFormComponent),
      multi: true
    }
  ]
})
export class DepartmentFormComponent extends SubFormComponent implements OnInit, OnChanges {
  @Input() offices: Array<Select> = [];

  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;
  public FormFieldError = fieldError;

  public formGroup: FormGroup;

  public TabName = {
    [FormControlName.Office]: 'Выберите отделение'
  };

  constructor(public formUtils: FormUtilsService,
              public utils: UtilsService) {
    super();
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      [FormControlName.Office]: new FormControl('', [Validators.required])
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const firstChange = changes.offices.firstChange;
    const previousOffices = changes.offices.previousValue;
    const currentOffices = changes.offices.currentValue;

    if (((previousOffices && previousOffices[0].value) !== currentOffices[0].value) && !firstChange) {
      of(this.offices)
        .pipe(
          take(1),
          delay(0))
        .subscribe((offices: Select[]) => {
          this.formGroup.get(FormControlName.Office).setValue(offices[0].value);
        });
    }

  }

  writeValue(data: any): void {
    of(this.offices)
      .pipe(
        take(1),
        delay(0))
      .subscribe((offices: Select[]) => {
        super.writeValue(data || {office: offices[0].value});
        this.formGroup.markAllAsTouched();
        this.formGroup.markAsTouched();
      });
  }
}
