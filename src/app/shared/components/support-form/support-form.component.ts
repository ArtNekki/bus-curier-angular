import { Component, OnInit } from '@angular/core';
import cities from '../../../mock-data/cities';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-support-form',
  templateUrl: './support-form.component.html',
  styleUrls: ['./support-form.component.scss']
})
export class SupportFormComponent implements OnInit {
  public cities = cities;
  public form: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      city: new FormControl(this.cities[1].value, [Validators.required]),
      email: new FormControl('', [Validators.required]),
      tel: new FormControl('', [Validators.required]),
      question: new FormControl('', [Validators.required]),
      subscribe: new FormControl('', []),
    });
  }

  onSubmit() {
    const formData = this.form;
    console.log('this.form', formData);
  }
}
