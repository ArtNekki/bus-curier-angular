import { Component, OnInit } from '@angular/core';
import formFieldMeta from '../../../../../core/form/formFieldMeta';
import fieldError from '../../../../../core/form/fieldError';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UtilsService} from '../../../../../core/services/utils.service';
import {FormUtilsService} from '../../../../../core/services/form-utils.service';
import FormControlName from 'src/app/core/maps/FormControlName';

@Component({
  selector: 'app-individual-edit',
  templateUrl: './individual-edit.component.html',
  styleUrls: ['./individual-edit.component.scss']
})
export class IndividualEditComponent implements OnInit {

  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;
  public FormFieldError = fieldError;

  public form = new FormGroup({
    [FormControlName.Fio]: new FormControl('', []),
    [FormControlName.Email]: new FormControl('', [Validators.email]),
    [FormControlName.Tel]: new FormControl('', []),
    [FormControlName.PassportNumber]: new FormControl('', [])
  });

  constructor(
    public utils: UtilsService,
    public formUtils: FormUtilsService) { }

  ngOnInit( ): void {
  }

  onSubmit() {
    console.log('Individual edit', this.form.value);
  }
}
