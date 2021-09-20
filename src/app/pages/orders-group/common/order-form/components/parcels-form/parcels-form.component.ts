import {ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, OnInit} from '@angular/core';
import fieldError from '../../../../../../core/form/fieldError';
import {FormArray, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {FormUtilsService} from '../../../../../../core/services/form-utils.service';
import {UtilsService} from '../../../../../../core/services/utils.service';
import {SimpleModalService} from 'ngx-simple-modal';
import {map} from 'rxjs/operators';
import {ConfirmModalComponent} from '../../../../../../modals/confirm-modal/confirm-modal.component';
import {SubFormComponent} from '../sub-form/sub-form.component';

@Component({
  selector: 'app-parcels-form',
  templateUrl: './parcels-form.component.html',
  styleUrls: ['./parcels-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ParcelsFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ParcelsFormComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ParcelsFormComponent extends SubFormComponent implements OnInit {
  public FormFieldError = fieldError;

  public formGroup: FormGroup;

  constructor(public formUtils: FormUtilsService,
              public utils: UtilsService,
              private simpleModal: SimpleModalService,
              private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      parcels: new FormArray([
        new FormControl('', [Validators.required])
      ])
    });

    this.formGroup.markAllAsTouched();
    this.formGroup.markAsTouched();
    this.onTouched();

    super.ngOnInit();
  }

  public get parcels(): FormArray {
    return this.formGroup.get('parcels') as FormArray;
  }

  get isSomeParcelsInvalid() {
    return this.parcels.controls.some((control) => {
      return control.invalid;
    });
  }

  getGroupControls(group) {
    return (group as FormGroup).controls;
  }

  writeValue(value: any): void {
    if (value) {
      this.parcels.clear();
      value.forEach(item => this.parcels.push(new FormControl(item)));
    }
  }

  registerOnChange(fn: any): void {
    this.formGroup.valueChanges.pipe( map(value => value.parcels)).subscribe(fn);
  }

  add() {
    if (this.isSomeParcelsInvalid) {
      return;
    }

    this.parcels.push(new FormControl('', [Validators.required]));
  }

  delete(index: number) {
    if (this.parcels.length <= 1) {
      return;
    }

    if (this.parcels.value[index]) {
      this.confirm().subscribe((ok) => {
        if (!ok) {
          return;
        }

        this.parcels.removeAt(index);
        this.cdr.detectChanges();
      });
    } else {
      this.parcels.removeAt(index);
    }
  }

  confirm() {
    return this.simpleModal.addModal(ConfirmModalComponent, {
      message: `Вы уверены? <br /> Данные будут потеряны.`
    });
  }
}
