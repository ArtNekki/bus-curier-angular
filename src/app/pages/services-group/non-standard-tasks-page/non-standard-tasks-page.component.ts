import { Component, OnInit } from '@angular/core';
import formFieldMeta from '../../../core/form/formFieldMeta';
import fieldError from '../../../core/form/fieldError';
import FormControlName from 'src/app/core/maps/FormControlName';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UtilsService} from '../../../core/services/utils.service';

@Component({
  selector: 'app-non-standard-tasks-page',
  templateUrl: './non-standard-tasks-page.component.html',
  styleUrls: ['./non-standard-tasks-page.component.scss']
})
export class NonStandardTasksPageComponent implements OnInit {
  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;
  public FormFieldError = fieldError;

  public form: FormGroup;

  constructor(public utils: UtilsService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      [FormControlName.Tel]: new FormControl('', [Validators.required]),
      [FormControlName.Agree]: new FormControl('')
    });
  }

  onSubmit() {
    console.log('manager call', this.form.value);
  }
}
