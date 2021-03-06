import {Component, forwardRef, OnInit} from '@angular/core';
import {FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import FormControlName from 'src/app/core/maps/FormControlName';
import {SubFormComponent} from '../sub-form/sub-form.component';

@Component({
  selector: 'app-docs-form',
  templateUrl: './docs-form.component.html',
  styleUrls: ['./docs-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DocsFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DocsFormComponent),
      multi: true
    }
  ]
})
export class DocsFormComponent extends SubFormComponent implements OnInit {
  public FormControlName = FormControlName;
  public formGroup: FormGroup;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      [FormControlName.Count]: new FormControl('', [Validators.required, Validators.min(1)])
    });

    this.formGroup.markAllAsTouched();
    super.ngOnInit();
  }
}
