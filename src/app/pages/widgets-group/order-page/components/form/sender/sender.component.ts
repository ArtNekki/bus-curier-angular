import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import formFieldMeta from '../../../../../../core/form/formFieldMeta';
import fieldError from '../../../../../../core/form/fieldError';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FormUtilsService} from '../../../../../../core/services/form-utils.service';
import {UtilsService} from '../../../../../../core/services/utils.service';
import FormControlName from 'src/app/core/maps/FormControlName';
import roles from 'src/app/mock-data/roles';

@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.scss']
})
export class SenderComponent implements OnInit {
  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;
  public FormFieldError = fieldError;

  public formGroup: FormGroup;
  public roles = roles;

  constructor(public formUtils: FormUtilsService,
              public utils: UtilsService,
              private readonly cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      fio: new FormControl('', [Validators.required, Validators.email]),
      doc: new FormControl('', []),
      'doc-number': new FormControl('', [Validators.required, Validators.pattern('0000 000000')]),
      tel: new FormControl('', []),
    });
  }
}
