import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import formFieldMeta from '../../../../../../core/form/formFieldMeta';
import fieldError from '../../../../../../core/form/fieldError';
import FormControlName from 'src/app/core/maps/FormControlName';
import {FormUtilsService} from '../../../../../../core/services/form-utils.service';
import {UtilsService} from '../../../../../../core/services/utils.service';
import roles from 'src/app/mock-data/roles';

@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.scss']
})
export class IndividualComponent implements OnInit {
  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;
  public FormFieldError = fieldError;

  public formGroup: FormGroup;
  public roles = roles;

  constructor(public formUtils: FormUtilsService,
              public utils: UtilsService) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      [FormControlName.LastName]: new FormControl('', [Validators.required]),
      [FormControlName.FirstName]: new FormControl('', [Validators.required]),
      [FormControlName.MiddleName]: new FormControl('', [Validators.required]),
      [FormControlName.Email]: new FormControl('', [Validators.required]),
      [FormControlName.Tel]: new FormControl('', [Validators.required]),
      [FormControlName.Role]: new FormControl('', [Validators.required]),
    });
  }
}
