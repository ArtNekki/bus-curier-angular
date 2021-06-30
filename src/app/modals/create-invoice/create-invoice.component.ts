import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import fieldError from '../../core/form/fieldError';
import {UtilsService} from '../../core/services/utils.service';
import {SimpleModalComponent} from 'ngx-simple-modal';
import FormControlName from 'src/app/core/maps/FormControlName';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss']
})
export class CreateInvoiceComponent extends SimpleModalComponent<null, null> implements OnInit, OnDestroy {
  public FormControlName = FormControlName;
  public FormFieldError = fieldError;

  public form: FormGroup;

  constructor(public utils: UtilsService) {
    super();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      [FormControlName.Sum]: new FormControl('', [Validators.required])
    });
  }

  ngOnDestroy(): void {
  }

  onSubmit() {
    console.log('create invoice', this.form.value);
  }
}
