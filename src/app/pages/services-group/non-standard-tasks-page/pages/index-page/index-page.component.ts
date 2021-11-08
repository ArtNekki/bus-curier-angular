import {Component, OnDestroy, OnInit} from '@angular/core';
import formFieldMeta from '../../../../../core/form/formFieldMeta';
import fieldError from '../../../../../core/form/fieldError';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UtilsService} from '../../../../../core/services/utils.service';
import FormControlName from 'src/app/core/maps/FormControlName';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent implements OnInit, OnDestroy {
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

    document.body.classList.add('non-standard-tasks');
  }

  onSubmit() {}

  ngOnDestroy(): void {
    document.body.classList.remove('non-standard-tasks');
  }
}
