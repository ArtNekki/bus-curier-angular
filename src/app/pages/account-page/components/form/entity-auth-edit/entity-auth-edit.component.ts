import {Component, Input, OnInit} from '@angular/core';
import formFieldMeta from '../../../../../core/form/formFieldMeta';
import fieldError from '../../../../../core/form/fieldError';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UtilsService} from '../../../../../core/services/utils.service';
import {FormUtilsService} from '../../../../../core/services/form-utils.service';
import FormControlName from 'src/app/core/maps/FormControlName';
import {Router} from '@angular/router';

@Component({
  selector: 'app-entity-auth-edit',
  templateUrl: './entity-auth-edit.component.html',
  styleUrls: ['./entity-auth-edit.component.scss']
})
export class EntityAuthEditComponent implements OnInit {
  @Input() queryParams;

  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;
  public FormFieldError = fieldError;

  public form = new FormGroup({
    [FormControlName.Email]: new FormControl('', [Validators.email]),
    [FormControlName.Password]: new FormControl('', [])
  });

  constructor(
    public utils: UtilsService,
    public formUtils: FormUtilsService,
    private router: Router) { }

  ngOnInit(): void {
  }

  goBack() {
    delete this.queryParams['editAuth'];

    const url = this.utils.formatUrl(this.router.url);

    this.router.navigate(url, {
      queryParams: this.queryParams
    });
  }

  cancel(e) {
    e.preventDefault();
    this.goBack();
  }

  onSubmit() {
    this.goBack();
  }
}
