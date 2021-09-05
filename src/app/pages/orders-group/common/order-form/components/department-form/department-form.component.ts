import {Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import formFieldMeta from '../../../../../../core/form/formFieldMeta';
import fieldError from '../../../../../../core/form/fieldError';
import {FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {FormUtilsService} from '../../../../../../core/services/form-utils.service';
import {OrderFormService} from '../../../../../../core/services/order-form/order-form.service';
import {UtilsService} from '../../../../../../core/services/utils.service';
import FormControlName from 'src/app/core/maps/FormControlName';
import {SubFormComponent} from '../sub-form/sub-form.component';
import Select from '../../../../../../core/models/Select';

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
              orderForm: OrderFormService,
              public utils: UtilsService) {
    super(orderForm);
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      [FormControlName.Office]: new FormControl('', [Validators.required])
    });

    setTimeout(() => {
      this.formGroup.get(FormControlName.Office).setValue(this.offices[0].value);
    }, 0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const offices = changes.offices.currentValue;

    if (offices.length && this.formGroup) {
      setTimeout(() => {
        this.formGroup.get(FormControlName.Office).setValue(changes.offices.currentValue[0].value);
      });
    }
  }
}
