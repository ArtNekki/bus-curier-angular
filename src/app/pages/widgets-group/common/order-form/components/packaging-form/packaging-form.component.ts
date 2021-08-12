import {ChangeDetectorRef, Component, forwardRef, OnInit} from '@angular/core';
import formFieldMeta from '../../../../../../core/form/formFieldMeta';
import {AbstractControl, FormArray, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {FormUtilsService} from '../../../../../../core/services/form-utils.service';
import {UtilsService} from '../../../../../../core/services/utils.service';
import {OrderFormService} from '../../../../../../core/services/order-form/order-form.service';
import {SubFormComponent} from '../sub-form/sub-form.component';
import FormControlName from 'src/app/core/maps/FormControlName';
import fadeIn from '../../../../../../core/animations/fadeIn';
import {switchMap} from 'rxjs/operators';
import {CalculatorService} from '../../../../../../core/services/calculator/calculator.service';

interface Service {
  id: string;
  name: string;
  site_name: string;
  price: string;
  group_id: string;
  subgroup_id: string;
}

@Component({
  selector: 'app-packaging-form',
  templateUrl: './packaging-form.component.html',
  styleUrls: ['./packaging-form.component.scss'],
  animations: [fadeIn],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PackagingFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PackagingFormComponent),
      multi: true
    }
  ]
})
export class PackagingFormComponent extends SubFormComponent implements OnInit {
  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;

  public formGroup: FormGroup;
  public formattedData = {};
  public activeCheckboxId;

  constructor(public formUtils: FormUtilsService,
              public utils: UtilsService,
              private calcService: CalculatorService,
              private cdr: ChangeDetectorRef,
              protected orderForm: OrderFormService) {
    super(orderForm);
  }

  ngOnInit(): void {

    this.formGroup = new FormGroup({
      boxes: new FormArray([]),
      ['save-packs']: new FormArray([]),
      ['plastic-packs']: new FormArray([]),
      skins: new FormArray([]),
      other: new FormArray([])
    });

    this.orderForm.cityFrom$.pipe(
      switchMap((id: string) => {
        return this.calcService.getServices(id);
      })
    ).subscribe((arr: Array<Service>) => {
      const packages = arr.filter((item: Service) => item.group_id === '1');

      packages.forEach((item: Service) => {
        this.formattedData[item.id] = { name: item.name, site_name: item.site_name, price: item.price };

        switch (item.subgroup_id) {
          case '1':
            (this.formGroup.get('boxes') as FormArray).push(new FormGroup({
              [item.id]: new FormControl(''),
              [FormControlName.Counter]: new FormControl('')
            }));
            break;
          case '2':
            (this.formGroup.get('save-packs') as FormArray).push(new FormGroup({
              [item.id]: new FormControl(''),
              [FormControlName.Counter]: new FormControl('')
            }));
            break;
          case '3':
            (this.formGroup.get('plastic-packs') as FormArray).push(new FormGroup({
              [item.id]: new FormControl(''),
              [FormControlName.Counter]: new FormControl('')
            }));
            break;
          case '4':
          case '5':
            (this.formGroup.get('other') as FormArray).push(new FormGroup({
              [item.id]: new FormControl(''),
              [FormControlName.Counter]: new FormControl('')
            }));
            break;
          case '6':
            (this.formGroup.get('skins') as FormArray).push(new FormGroup({
              [item.id]: new FormControl(''),
              [FormControlName.Counter]: new FormControl('')
            }));
            break;
        }
      });
    });
  }

  public get boxes(): FormArray {
    return this.formGroup.get('boxes') as FormArray;
  }

  public get savePacks(): FormArray {
    return this.formGroup.get('save-packs') as FormArray;
  }

  public get plasticPacks(): FormArray {
    return this.formGroup.get('plastic-packs') as FormArray;
  }

  public get skins(): FormArray {
    return this.formGroup.get('skins') as FormArray;
  }

  public get other(): FormArray {
    return this.formGroup.get('other') as FormArray;
  }

  closeModal(i: number) {
    this.activeCheckboxId = null;
    // Object.values((this.items.at(i) as FormGroup).controls)[0].patchValue(false);
  }

  setActiveCheckbox(id: number) {
    console.log('active', id);
    this.activeCheckboxId = id;
  }

  getId(i: number, arr: any) {
    return Object.keys((arr.at(i) as FormGroup).controls)[0];
  }

  disableCheckbox(control) {
    // control.disable();
    console.log('disable checkbox', control);
  }

  changeControlState(control, count: any) {
    if (count > 0) {
      control.disable();
    }
  }

  getCheckboxControl(i: number, arr: any) {
    return Object.values((arr.at(i) as FormGroup).controls)[0];
  }
}
