import { Component, OnInit } from '@angular/core';
import formFieldMeta from '../../../../../core/form/formFieldMeta';
import fieldError from '../../../../../core/form/fieldError';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UtilsService} from '../../../../../core/services/utils.service';
import {FormUtilsService} from '../../../../../core/services/form-utils.service';
import FormControlName from 'src/app/core/maps/FormControlName';

@Component({
  selector: 'app-entity-auth-edit',
  templateUrl: './entity-auth-edit.component.html',
  styleUrls: ['./entity-auth-edit.component.scss']
})
export class EntityAuthEditComponent implements OnInit {
  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;
  public FormFieldError = fieldError;

  public form = new FormGroup({
    [FormControlName.Email]: new FormControl('', [Validators.email]),
    [FormControlName.Password]: new FormControl('', [])
  });

  constructor(
    public utils: UtilsService,
    public formUtils: FormUtilsService) { }

  ngOnInit( ): void {
  }

  onSubmit() {
    console.log('entity auth edit', this.form.value);
  }
}
