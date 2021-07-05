import { Component, OnInit } from '@angular/core';
import cities from '../../../../mock-data/cities';
import formFieldMeta from '../../../../core/form/formFieldMeta';
import fieldError from '../../../../core/form/fieldError';
import FormControlName from 'src/app/core/maps/FormControlName';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UtilsService} from '../../../../core/services/utils.service';

@Component({
  selector: 'app-index-form-order',
  templateUrl: './index-form-order.component.html',
  styleUrls: ['./index-form-order.component.scss']
})
export class IndexFormOrderComponent implements OnInit {
  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;
  public FormFieldError = fieldError;

  public form: FormGroup;
  public cities = cities;

  constructor(public utils: UtilsService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      [FormControlName.CityStart]: new FormControl('', [Validators.required]),
      [FormControlName.CityEnd]: new FormControl('', [Validators.required]),
      [FormControlName.Question]: new FormControl('', [Validators.required]),
      [FormControlName.Agree]: new FormControl(''),
    });

    // cities.unshift({value: '', name: 'Не выбрано'});
    this.cities = cities;
  }

  onSubmit() {
    this.form.markAllAsTouched();
    console.log('index order form', this.form.value);
  }
}
