import { Component, OnInit } from '@angular/core';
import cities from '../../../mock-data/cities';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import formFieldMeta from '../../../core/form/formFieldMeta';
import fieldError from '../../../core/form/fieldError';
import {UtilsService} from '../../../core/services/utils.service';
import FormControlName from 'src/app/core/maps/FormControlName';
import {FormUtilsService} from '../../../core/services/form-utils.service';

@Component({
  selector: 'app-support-form',
  templateUrl: './support-form.component.html',
  styleUrls: ['./support-form.component.scss']
})
export class SupportFormComponent implements OnInit {
  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;
  public FormFieldError = fieldError;

  public cities = cities;
  public form: FormGroup;

  constructor(public formUtils: FormUtilsService,
              public utils: UtilsService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      [FormControlName.Location]: new FormControl('', [Validators.required]),
      [FormControlName.Email]: new FormControl('', [Validators.required, Validators.email]),
      [FormControlName.Tel]: new FormControl('', [Validators.required]),
      [FormControlName.Question]: new FormControl('', [Validators.required]),
      [FormControlName.Agree]: new FormControl('', []),
    });

    cities.unshift({value: '', name: 'Не выбрано'});
    this.cities = cities;
  }

  onSubmit() {
    this.form.markAllAsTouched();
    const formData = this.form;
  }
}
