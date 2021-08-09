import {Component, forwardRef, OnInit} from '@angular/core';
import formFieldMeta from '../../../../../../core/form/formFieldMeta';
import {FormArray, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {FormUtilsService} from '../../../../../../core/services/form-utils.service';
import {UtilsService} from '../../../../../../core/services/utils.service';
import {OrderFormService} from '../../../../../../core/services/order-form/order-form.service';
import {SubFormComponent} from '../sub-form/sub-form.component';
import FormControlName from 'src/app/core/maps/FormControlName';
import fadeIn from '../../../../../../core/animations/fadeIn';

@Component({
  selector: 'app-packaging-form',
  templateUrl: './packaging-form.component.html',
  styleUrls: ['./packaging-form.component.scss'],
  animations: [fadeIn],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PackagingFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PackagingFormComponent),
      multi: true
    }
  ]
})
export class PackagingFormComponent extends SubFormComponent implements OnInit {
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
