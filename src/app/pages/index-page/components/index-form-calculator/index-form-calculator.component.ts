import { Component, OnInit } from '@angular/core';
import cities from '../../../../mock-data/cities';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import dropdown from '../../../../core/animations/dropdown';

@Component({
  selector: 'app-index-form-calculator',
  templateUrl: './index-form-calculator.component.html',
  styleUrls: ['./index-form-calculator.component.scss'],
  animations: [dropdown]
})
export class IndexFormCalculatorComponent implements OnInit {

  public cities = cities;
  public form: FormGroup;
  public step = {
    from: 0,
    to: 0
  }

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      cityFrom: new FormControl(this.cities[1].value, [Validators.required]),
      pointFrom: new FormControl('', [Validators.required]),
      cityTo: new FormControl(this.cities[1].value, [Validators.required]),
      pointTo: new FormControl('', [Validators.required]),
    });
  }

  toNextField(dir, num) {
    this.step[dir] = num;
  }

  onSubmit() {
    console.log('form', this.form.value);
    console.log('value', this.form.invalid);
  }
}
