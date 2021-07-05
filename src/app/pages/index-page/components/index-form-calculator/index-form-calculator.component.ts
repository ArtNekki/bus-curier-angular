import { Component, OnInit } from '@angular/core';
import cities from '../../../../mock-data/cities';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import dropdown from '../../../../core/animations/dropdown';
import formFieldMeta from '../../../../core/form/formFieldMeta';
import fieldError from '../../../../core/form/fieldError';
import FormControlName from 'src/app/core/maps/FormControlName';

@Component({
  selector: 'app-index-form-calculator',
  templateUrl: './index-form-calculator.component.html',
  styleUrls: ['./index-form-calculator.component.scss'],
  animations: [dropdown]
})
export class IndexFormCalculatorComponent implements OnInit {
  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;
  public FormFieldError = fieldError;

  public cities = cities;
  public form: FormGroup;
  public step = {
    from: 0,
    to: 0
  };

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      [FormControlName.CityStart]: new FormControl('', [Validators.required]),
      [FormControlName.PickpointStart]: new FormControl('', [Validators.required]),
      [FormControlName.CityEnd]: new FormControl('', [Validators.required]),
      [FormControlName.PickpointEnd]: new FormControl('', [Validators.required]),
    });

    cities.unshift({value: '', name: 'Не выбрано'});
    this.cities = cities;
  }

  toNextField(dir, num) {
    this.step[dir] = num;
  }

  onSubmit() {
    this.form.markAllAsTouched();
    console.log('index calc form', this.form.value);
  }
}
