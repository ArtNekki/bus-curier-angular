import {Component, forwardRef, OnInit} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormArray,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors, Validator
} from '@angular/forms';
import {map} from 'rxjs/operators';
import FormControlName from 'src/app/core/maps/FormControlName';
import formFieldMeta from '../../../../../../core/form/formFieldMeta';
import {FormUtilsService} from '../../../../../../core/services/form-utils.service';
import {UtilsService} from '../../../../../../core/services/utils.service';
import fadeIn from '../../../../../../core/animations/fadeIn';
import {BasicGroupComponent} from '../basic-group/basic-group.component';
import {OrderFormService} from '../../../../../../core/services/order-form/order-form.service';

@Component({
  selector: 'app-packaging',
  templateUrl: './packaging.component.html',
  styleUrls: ['./packaging.component.scss'],
  animations: [fadeIn],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PackagingComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PackagingComponent),
      multi: true
    }
  ]
})
export class PackagingComponent extends BasicGroupComponent implements OnInit  {
  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;

  public formGroup: FormGroup;

  constructor(public formUtils: FormUtilsService,
              public utils: UtilsService,
              orderForm: OrderFormService) {
    super(orderForm);
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      items: new FormArray([
        new FormGroup({
          [FormControlName.CardboardBox]: new FormControl(''),
          [FormControlName.Counter]: new FormControl('')
        }),
        new FormGroup({
          [FormControlName.TransparentFilm]: new FormControl(''),
          [FormControlName.Counter]: new FormControl('')
        }),
        new FormGroup({
          [FormControlName.SafePack]: new FormControl(''),
          [FormControlName.Counter]: new FormControl('')
        }),
        new FormGroup({
          [FormControlName.BlackFilm]: new FormControl(''),
          [FormControlName.Counter]: new FormControl('')
        }),
        new FormGroup({
          [FormControlName.BagWithSeal]: new FormControl(''),
          [FormControlName.Counter]: new FormControl('')
        })
      ])
    });
  }

  public get items(): FormArray {
    return this.formGroup.get('items') as FormArray;
  }
}
