import {ChangeDetectorRef, Component, forwardRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import formFieldMeta from '../../../../../../core/form/formFieldMeta';
import {AbstractControl, FormArray, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {FormUtilsService} from '../../../../../../core/services/form-utils.service';
import {UtilsService} from '../../../../../../core/services/utils.service';
import {OrderFormService} from '../../../../../../core/services/order-form/order-form.service';
import {SubFormComponent} from '../sub-form/sub-form.component';
import FormControlName from 'src/app/core/maps/FormControlName';
import fadeIn from '../../../../../../core/animations/fadeIn';
import {switchMap, tap} from 'rxjs/operators';
import {CalculatorService} from '../../../../../../core/services/calculator/calculator.service';
import {ConfirmModalComponent} from '../../../../../../modals/confirm-modal/confirm-modal.component';
import {AlertModalComponent} from '../../../../../../modals/alert-modal/alert-modal.component';
import {SimpleModalService} from 'ngx-simple-modal';
import Service from 'src/app/core/models/Service';
import {Subscription} from 'rxjs';

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
export class PackagingFormComponent extends SubFormComponent implements OnInit, OnDestroy, OnChanges {
  @Input() cityFromId: string;
  @Input() services: Array<Service> = [];

  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;

  public formGroup: FormGroup;
  public formattedData = {};
  public activeCheckboxId;

  public packagesSub: Subscription;

  constructor(public formUtils: FormUtilsService,
              public utils: UtilsService,
              private calcService: CalculatorService,
              private cdr: ChangeDetectorRef,
              private simpleModal: SimpleModalService,
              protected orderForm: OrderFormService) {
    super(orderForm);
  }

  ngOnInit(): void {

    this.formGroup = new FormGroup({
      [FormControlName.Box]: new FormArray([]),
      [FormControlName.SafePack]: new FormArray([]),
      [FormControlName.PlasticPack]: new FormArray([]),
      [FormControlName.Skin]: new FormArray([]),
      [FormControlName.Other]: new FormArray([])
    });

    this.setPackage(this.services);
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.services && changes.services.currentValue.length && this.formGroup) {
      this.clearPackage();
      this.setPackage(changes.services.currentValue);
    }
  }

  setPackage(arr: Array<Service>) {

    const packages = arr.filter((item: Service) => item.group_id === '1');

    packages.forEach((item: Service) => {
      this.formattedData[item.id] = { name: item.name, site_name: item.site_name, params: item.property, price: item.price };

      switch (item.subgroup_id) {
        case '1':
          this.boxes.push(new FormGroup({
            [item.id]: new FormControl(''),
            [FormControlName.Counter]: new FormControl(0)
          }));
          break;
        case '2':
          this.safePacks.push(new FormGroup({
            [item.id]: new FormControl(''),
            [FormControlName.Counter]: new FormControl('')
          }));
          break;
        case '3':
          this.plasticPacks.push(new FormGroup({
            [item.id]: new FormControl(''),
            [FormControlName.Counter]: new FormControl('')
          }));
          break;
        case '4':
        case '5':
          this.other.push(new FormGroup({
            [item.id]: new FormControl(''),
            [FormControlName.Counter]: new FormControl('')
          }));
          break;
        case '6':
          this.skins.push(new FormGroup({
            [item.id]: new FormControl(''),
            [FormControlName.Counter]: new FormControl('')
          }));
          break;
      }
    });
  }

  clearPackage() {
    this.boxes.clear();
    this.safePacks.clear();
    this.plasticPacks.clear();
    this.skins.clear();
    this.other.clear();
  }

  public get boxes(): FormArray {
    return this.formGroup.get(FormControlName.Box) as FormArray;
  }

  public get safePacks(): FormArray {
    return this.formGroup.get(FormControlName.SafePack) as FormArray;
  }

  public get plasticPacks(): FormArray {
    return this.formGroup.get(FormControlName.PlasticPack) as FormArray;
  }

  public get skins(): FormArray {
    return this.formGroup.get(FormControlName.Skin) as FormArray;
  }

  public get other(): FormArray {
    return this.formGroup.get(FormControlName.Other) as FormArray;
  }

  closeModal(control: AbstractControl) {
    control.patchValue(false);
    this.activeCheckboxId = null;
    // Object.values((this.items.at(i) as FormGroup).controls)[0].patchValue(false);
  }

  setActiveCheckbox(id: number) {
    this.activeCheckboxId = id;
  }

  getId(i: number, arr: any) {
    return Object.keys((arr[i] as FormGroup).controls)[0];
  }

  disableCheckbox(control) {
    // control.disable();
    console.log('disable checkbox', control);
  }

  changeControlState(control, count: any) {
    if (count > 0) {
      control.disable({onlySelf: true});
    }

    this.activeCheckboxId = null;
  }

  getCheckboxControl(i: number, arr: any) {
    return Object.values((arr[i] as FormGroup).controls)[0];
  }

  // controls: AbstractControl[]

  getCounterControl(i: number, arr: any) {
    return Object.values((arr[i] as FormGroup).controls)[1];
  }

  get dataLoaded() {
    return this.boxes.length || this.safePacks.length || this.plasticPacks.length || this.skins.length || this.other.length;
  }

  clear(event, counter: AbstractControl, checkbox: AbstractControl) {
    event.preventDefault();
    this.confirmClear(counter, checkbox);
  }

  confirmClear(counter: AbstractControl, checkbox: AbstractControl) {
    this.simpleModal.addModal(ConfirmModalComponent, {
      message: 'Данные будут потеряны! <br> Вы уверены?'
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {
        counter.patchValue(0);
        checkbox.patchValue(false);
        checkbox.enable();
      }
    });
  }

  ngOnDestroy() {
    // this.packagesSub.unsubscribe();
  }
}
