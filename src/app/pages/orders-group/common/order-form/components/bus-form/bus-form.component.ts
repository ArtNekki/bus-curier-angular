import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import FormControlName from 'src/app/core/maps/FormControlName';
import {SubFormComponent} from '../sub-form/sub-form.component';
import formFieldMeta from '../../../../../../core/form/formFieldMeta';

@Component({
  selector: 'app-bus-form',
  templateUrl: './bus-form.component.html',
  styleUrls: ['./bus-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BusFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => BusFormComponent),
      multi: true
    }
  ]
})
export class BusFormComponent extends SubFormComponent implements OnInit {
  @Input() title = 'Встретить с автобуса';

  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;
  public formGroup: FormGroup;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      [FormControlName.Meet]: new FormControl('', [Validators.required])
    });

    setTimeout(() => {
      this.formGroup.get(FormControlName.Meet).setValue(true);
      this.formGroup.markAllAsTouched();
    }, 0);

    super.ngOnInit();
  }
}
