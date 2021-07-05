import { Component, OnInit } from '@angular/core';
import cities from '../../mock-data/cities';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import formFieldMeta from '../../core/form/formFieldMeta';
import fieldError from '../../core/form/fieldError';
import FormControlName from 'src/app/core/maps/FormControlName';
import {FormUtilsService} from '../../core/services/form-utils.service';
import {UtilsService} from '../../core/services/utils.service';

@Component({
  selector: 'app-feedback-page',
  templateUrl: './feedback-page.component.html',
  styleUrls: ['./feedback-page.component.scss']
})
export class FeedbackPageComponent implements OnInit {
  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;
  public FormFieldError = fieldError;

  public form: FormGroup;
  public cities = cities;

  constructor(public formUtils: FormUtilsService,
              public utils: UtilsService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      [FormControlName.FirstName]: new FormControl('', [Validators.required]),
      [FormControlName.Tel]: new FormControl('', [Validators.required]),
      [FormControlName.Location]: new FormControl('', [Validators.required]),
      [FormControlName.Email]: new FormControl('', [Validators.required, Validators.email]),
      [FormControlName.Question]: new FormControl('', [Validators.required]),
      [FormControlName.Agree]: new FormControl('', []),
    });
  }

  onSubmit() {
    console.log('feedback form', this.form.value);
  }
}
