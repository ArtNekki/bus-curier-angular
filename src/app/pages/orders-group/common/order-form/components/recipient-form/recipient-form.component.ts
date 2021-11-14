import {Component, forwardRef, Input, OnInit} from '@angular/core';
import formFieldMeta from '../../../../../../core/form/formFieldMeta';
import fieldError from '../../../../../../core/form/fieldError';
import {FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {FormUtilsService} from '../../../../../../core/services/form-utils.service';
import {UtilsService} from '../../../../../../core/services/utils.service';
import {SubFormComponent} from '../sub-form/sub-form.component';
import FormControlName from 'src/app/core/maps/FormControlName';
import {Pattern} from '../../../../../../core/pattern/pattern';

@Component({
  selector: 'app-recipient-form',
  templateUrl: './recipient-form.component.html',
  styleUrls: ['./recipient-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RecipientFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => RecipientFormComponent),
      multi: true
    }
  ]
})
export class RecipientFormComponent extends SubFormComponent implements OnInit {
  @Input() author;

  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;
  public FormFieldError = fieldError;

  public formGroup: FormGroup;

  constructor(public formUtils: FormUtilsService,
              public utils: UtilsService) {
    super();
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      [FormControlName.Fio]: new FormControl('', [Validators.required]),
      [FormControlName.Tel]: new FormControl('', [Validators.required, Validators.pattern(Pattern.Phone)])
    });

    this.setDefaultAuthor();
    super.ngOnInit();
  }

  setDefaultAuthor() {
    const isIndividual = this.author.active === FormControlName.Individual;
    const isRecipient = this.author.individual.role === FormControlName.Recipient;

    if (isIndividual && isRecipient) {

      const individual = this.author.individual;

      this.formGroup.get(FormControlName.Fio)
        .patchValue([
          individual[FormControlName.LastName],
          individual[FormControlName.FirstName],
          individual[FormControlName.MiddleName]
        ].join(` `));
      this.formGroup.get(FormControlName.Tel).patchValue(individual.tel);
    }
  }
}
