import {ChangeDetectorRef, Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {SimpleModalService} from 'ngx-simple-modal';
import {ConfirmModalComponent} from '../../../../../../modals/confirm-modal/confirm-modal.component';
import FormControlName from 'src/app/core/maps/FormControlName';
import {SubFormComponent} from '../sub-form/sub-form.component';
import {FormUtilsService} from '../../../../../../core/services/form-utils.service';
import fadeIn from '../../../../../../core/animations/fadeIn';
import {CargoType} from '../../../../../../core/interfaces/calculator';
import {Select} from '../../../../../../core/interfaces/form';

@Component({
  selector: 'app-auto-parts-form',
  templateUrl: './auto-parts-form.component.html',
  styleUrls: ['./auto-parts-form.component.scss'],
  animations: [fadeIn],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutoPartsFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AutoPartsFormComponent),
      multi: true
    }
  ]
})
export class AutoPartsFormComponent extends SubFormComponent implements OnInit, OnChanges {
  @Input() types: Array<CargoType> = [];

  public FormControlName = FormControlName;

  public formGroup: FormGroup;
  public parts: Array<Select> = [];

  constructor(
    public formUtils: FormUtilsService,
    private cdr: ChangeDetectorRef,
    private simpleModal: SimpleModalService) {
    super();
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      [FormControlName.Item]: new FormControl('', [Validators.required]),
      [FormControlName.Counter]: new FormControl('', [Validators.required])
    });

    this.setParts(this.types);
    this.formGroup.markAllAsTouched();

    super.ngOnInit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.types && changes.types.currentValue.length && this.formGroup) {
      this.setParts(changes.types.currentValue);
    }
  }

  setParts(arr: Array<CargoType>) {
    const parts = arr.filter((item: CargoType) => item.parent_id === '5' && item)
      .map((item: CargoType) => {
        return {value: item.id, name: item.name};
      });

    this.parts = [{value: '', name: ''}, ...parts];
  }

  clear() {
    this.formGroup.get(FormControlName.Item).setValue('');
    this.formGroup.get(FormControlName.Counter).setValue('');
  }

  confirm() {
    return this.simpleModal.addModal(ConfirmModalComponent, {
      message: `Вы уверены? <br /> Данные будут потеряны.`
    });
  }
}
