import { Component, OnInit } from '@angular/core';
import cities from 'src/app/mock-data/cities';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import FormControlName from '../../../core/maps/FormControlName';

@Component({
  selector: 'app-calc-rate-page',
  templateUrl: './calc-rate-page.component.html',
  styleUrls: ['./calc-rate-page.component.scss']
})
export class CalcRatePageComponent implements OnInit {
  public FormControlName = FormControlName;

  public form: FormGroup;
  public cities = cities;

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      [FormControlName.DeparturePoint]: new FormControl('', [Validators.required]),
      [FormControlName.PickupPoint]: new FormControl('', [Validators.required]),
      ['cargo-group']: new FormControl('', [Validators.required]),
      [FormControlName.Packaging]: new FormControl(''),
      [FormControlName.Services]: new FormControl('')
    });
  }

  onSubmit() {
    console.log('quick order', this.form.value);
  }
}
