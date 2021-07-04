import {Component, Input, OnInit} from '@angular/core';
import formFieldMeta from '../../../../../core/form/formFieldMeta';
import fieldError from '../../../../../core/form/fieldError';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UtilsService} from '../../../../../core/services/utils.service';
import {FormUtilsService} from '../../../../../core/services/form-utils.service';
import FormControlName from 'src/app/core/maps/FormControlName';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-entity-edit',
  templateUrl: './entity-edit.component.html',
  styleUrls: ['./entity-edit.component.scss']
})
export class EntityEditComponent implements OnInit {
  @Input() queryParams;

  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;
  public FormFieldError = fieldError;

  public form = new FormGroup({
    [FormControlName.CompanyName]: new FormControl('', []),
    [FormControlName.Leader]: new FormControl('', []),
    [FormControlName.Tel]: new FormControl('', []),
    [FormControlName.Inn]: new FormControl('', []),
    [FormControlName.Kpp]: new FormControl('', []),
    [FormControlName.Ogrn]: new FormControl('', []),
    [FormControlName.Bank]: new FormControl('', []),
    [FormControlName.Rc]: new FormControl('', []),
    [FormControlName.Kc]: new FormControl('', []),
    [FormControlName.DocNumber]: new FormControl('', []),
    [FormControlName.DocDate]: new FormControl('', []),
    [FormControlName.Carrier]: new FormControl('', []),
  });

  constructor(
    public utils: UtilsService,
    public formUtils: FormUtilsService,
    private router: Router) { }

  ngOnInit( ): void {
  }

  onSubmit() {
    console.log('edit entity', this.form.value);

    if (!this.form.invalid) {
      return false;
    }

    this.goBack();
  }

  goBack() {
    delete this.queryParams['editCompany'];

    const url = this.utils.formatUrl(this.router.url);

    this.router.navigate(url, {
      queryParams: this.queryParams
    });
  }

  cancel(e) {
    e.preventDefault();
    this.goBack();
  }
}
