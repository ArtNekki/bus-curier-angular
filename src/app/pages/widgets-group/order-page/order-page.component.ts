import {AfterViewInit, Component, OnInit} from '@angular/core';
import cities from 'src/app/mock-data/cities';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {animate, style, transition, trigger} from '@angular/animations';
import {KeyValue} from '@angular/common';
import {
  busGroup, cargoGroup,
  courierGroup,
  departmentGroup,
  departureGroup,
  entityGroup,
  individualGroup,
  parcelGroup, pickupGroup, recipientGroup,
  senderGroup
} from '../../../core/form/groups';
import AddService from '../../../core/maps/AddService';
import UserType from '../../../core/maps/UserType';
import User from 'firebase';
import DepartureTab from '../../../core/maps/DepartureTab';
import PickupTab from '../../../core/maps/PickupTab';
import formGroupMeta from '../../../core/form/formGroupMeta';
import FormControlName from '../../../core/maps/FormControlName';
import fieldError from '../../../core/form/fieldError';
import roles from '../../../mock-data/roles';
import departments from '../../../mock-data/departments';
import schedule from '../../../mock-data/schedule';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
  animations: [
    trigger('tag', [
    transition('void => *', [
      style({opacity: 0}),
      animate('200ms')
    ])
  ]),
    trigger('panel', [
      transition('void => *', [
        style({opacity: 0}),
        animate('200ms')
      ])
    ])
  ]
})
export class OrderPageComponent implements OnInit, AfterViewInit {
  public AddService = AddService;
  public UserType = UserType;
  public DepartureTab = DepartureTab;
  public PickupTab = PickupTab;
  public FormControlName = FormControlName;
  public formGroupMeta = formGroupMeta;
  public FormFieldError = fieldError;

  public roles = [];
  public departments = [];
  public schedule = [];
  public cities = cities;
  public form: FormGroup;
  public tags = [];

  public currentStep = 0;
  public currentCargoIndex = 0;
  public currentUserType = UserType.Individual;
  public currentCargoType = [];
  public currentAddService = AddService.Insurance;
  public currentDepartureTab = DepartureTab.Department;
  public currentPickupTab = PickupTab.Bus;

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      author: new FormGroup({
        individual: new FormControl(''),
        entity: new FormControl('')
      }),
      sender: new FormGroup({}),
      [FormControlName.Recipient]: new FormControl('')
    });

    this.tags.push(`cargo-${this.tags.length + 1}`);
    this.currentCargoType.push(FormControlName.Docs);

    roles.unshift({value: '', name: 'Не выбрано'});
    this.roles = roles;

    this.departments = departments;
    this.schedule = schedule;
  }

  ngAfterViewInit(): void {

  }

  setCurrentStep($event: any) {
    this.currentStep = $event;
  }

  onSubmit() {
    console.log('form', this.form.value);
  }

  goNext() {
    if (this.currentStep >= 3 ) {
      return;
    }

    this.form.markAllAsTouched();

    console.log('this.form', this.form);

    // if (this.form.invalid) {
    //   return;
    // }

    this.currentStep++;

    if (this.currentStep === 1 && !(Object.keys((this.form as FormGroup).get(UserType.Sender).value).length)) {
      (this.form as FormGroup).setControl(UserType.Sender, senderGroup);
    }

    if (this.currentStep === 1 && !((this.form as FormGroup).get(FormControlName.Departure))) {
      (this.form as FormGroup).addControl(FormControlName.Departure, departureGroup);
      this.showDepartureTab(this.currentDepartureTab);
    }

    if (this.currentStep === 2 && !((this.form as FormGroup).get(FormControlName.Cargo))) {
      (this.form as FormGroup).addControl(FormControlName.Cargo, cargoGroup);
    }

    if (this.currentStep === 2 && !((this.form as FormGroup).get('recipient'))) {
      (this.form as FormGroup).addControl('recipient', recipientGroup);
    }

    if (this.currentStep === 2 && !((this.form as FormGroup).get('pickup'))) {
      (this.form as FormGroup).addControl('pickup', pickupGroup);
      this.showPickupTab(this.currentPickupTab);
    }
  }

  goPrev() {
    if (this.currentStep <= 0 ) {
      return;
    }

    // this.form.markAllAsTouched();

    this.currentStep--;
  }

  get cargo() {
    return this.form.get(FormControlName.Cargo) as FormArray;
  }

  // get cargoType() {
  //   console.log(Object.keys(((this.form.get('cargo') as FormArray).controls[0].get('type') as FormGroup).controls));
  //   return Object.keys(((this.form.get('cargo') as FormArray).controls[0].get('type') as FormGroup).controls) ;
  // }


  // getArrayKeys(array) {
  //   return Object.keys((array as FormArray).controls);
  // }

  getGroupControls(group) {
    return (group as FormGroup).controls;
  }

  getArrayControls(array) {
    return (array as FormArray).controls;
  }

  addCargo() {
    const group = new FormGroup({
      [FormControlName.Type]: new FormGroup({
        [FormControlName.Docs]: new FormGroup({
          [FormControlName.PlaceCount]: new FormControl('', [])
        }),
        [FormControlName.Parcels]: new FormControl(''),
        [FormControlName.AutoParts]: new FormControl('', []),
        other: new FormGroup({})
      }),
      [FormControlName.Packaging]: new FormControl(''),
      services: new FormControl('')
    });
    (this.form.get(FormControlName.Cargo) as FormArray).push(group);

    this.currentCargoIndex = (this.form.get(FormControlName.Cargo) as FormArray).length - 1;
    this.currentCargoType.push(FormControlName.Docs);
  }

  deleteCargo(index: number) {
    (this.form.get(FormControlName.Cargo) as FormArray).removeAt(index);
    this.currentCargoIndex = (this.form.get(FormControlName.Cargo) as FormArray).length - 1;
    this.currentCargoType.splice(index, 1);
  }

  selectCargo(index: number) {
    this.currentCargoIndex = index;
  }

  selectCargoType(type: string, index) {
    this.currentCargoType.splice(index, 1, type);

    // switch (type) {
    //   case FormControlName.Docs:
    //     ((this.form.get(FormControlName.Cargo) as FormArray).controls[this.currentCargoIndex].get(FormControlName.Type).get(FormControlName.Docs) as FormGroup).addControl(FormControlName.PlaceCount, new FormControl('', []));
    //     // ((this.form.get(FormControlName.Cargo) as FormArray).controls[this.currentCargoIndex].get(FormControlName.Type).get(FormControlName.Parcels) as FormArray).clear();
    //     ((this.form.get(FormControlName.Cargo) as FormArray).controls[this.currentCargoIndex].get(FormControlName.Type).get(FormControlName.AutoParts) as FormArray).clear();
    //     break;
    //   case FormControlName.Parcels:
    //     // ((this.form.get(FormControlName.Cargo) as FormArray).controls[this.currentCargoIndex].get(FormControlName.Type).get(FormControlName.Parcels) as FormArray).push(parcelGroup);
    //     ((this.form.get(FormControlName.Cargo) as FormArray).controls[this.currentCargoIndex].get(FormControlName.Type).get(FormControlName.AutoParts) as FormArray).clear();
    //     ((this.form.get(FormControlName.Cargo) as FormArray).controls[this.currentCargoIndex].get(FormControlName.Type).get(FormControlName.Docs) as FormGroup).removeControl(FormControlName.PlaceCount);
    //     break;
    //   case FormControlName.AutoParts:
    //     ((this.form.get(FormControlName.Cargo) as FormArray).controls[this.currentCargoIndex].get(FormControlName.Type).get(FormControlName.AutoParts) as FormArray).push(new FormControl('', []));
    //     // ((this.form.get(FormControlName.Cargo) as FormArray).controls[this.currentCargoIndex].get(FormControlName.Type).get(FormControlName.Parcels) as FormArray).clear();
    //     ((this.form.get(FormControlName.Cargo) as FormArray).controls[this.currentCargoIndex].get(FormControlName.Type).get(FormControlName.Docs) as FormGroup).removeControl(FormControlName.PlaceCount);
    //     break;
    // }
  }

  originalOrder = (a: KeyValue<string, AbstractControl>, b: KeyValue<string, AbstractControl>): number => {
    return 0;
  }

  addParcelParams() {
    ((this.form.get(FormControlName.Cargo) as FormArray).controls[this.currentCargoIndex].get(FormControlName.Type).get(FormControlName.Parcels) as FormArray).push(parcelGroup);
  }

  deleteParcelParams(index: number) {
    const array = ((this.form.get(FormControlName.Cargo) as FormArray).controls[this.currentCargoIndex].get(FormControlName.Type).get(FormControlName.Parcels) as FormArray);

    if (array.length <= 1) {
      return;
    }

    array.removeAt(index);
  }

  addAutoDetail() {
    const autoDetail = new FormControl('', []);

    ((this.form.get(FormControlName.Cargo) as FormArray).controls[this.currentCargoIndex].get(FormControlName.Type).get(FormControlName.AutoParts) as FormArray).push(autoDetail);
  }

  removeAutoDetail(index: number) {
    const array = ((this.form.get(FormControlName.Cargo) as FormArray).controls[this.currentCargoIndex].get(FormControlName.Type).get(FormControlName.AutoParts) as FormArray);

    if (array.length <= 1) {
      return;
    }

    array.removeAt(index);
  }

  setAddService(type: string) {
    this.currentAddService = type;
  }

  setCurrentUserType(type: string) {
    this.currentUserType = type;

    switch (type) {
      // case UserType.Individual:
      //   (this.form.get(FormControlName.Author) as FormGroup).addControl(UserType.Individual, individualGroup);
      //   (this.form.get(FormControlName.Author) as FormGroup).removeControl(UserType.Entity);
      //   break;
      // case UserType.Entity:
      //   (this.form.get(FormControlName.Author) as FormGroup).addControl(UserType.Entity, entityGroup);
      //   (this.form.get(FormControlName.Author) as FormGroup).removeControl(UserType.Individual);
      //   break;
    }
  }

  setCurrentDepartureTab(tab: string) {
    this.currentDepartureTab = tab;
    this.showDepartureTab(tab);
  }

  showDepartureTab(tab: string) {
    switch (tab) {
      case this.DepartureTab.Department:
        (this.form.get(FormControlName.Departure) as FormGroup).addControl(FormControlName.Department, departmentGroup);
        (this.form.get(FormControlName.Departure) as FormGroup).removeControl(FormControlName.Courier);
        break;
      case this.DepartureTab.Courier:
        (this.form.get(FormControlName.Departure) as FormGroup).addControl(FormControlName.Courier, courierGroup);
        (this.form.get(FormControlName.Departure) as FormGroup).removeControl(FormControlName.Department);
        break;
    }
  }

  setCurrentPickupTab(tab: string) {
    this.currentPickupTab = tab;
    this.showPickupTab(tab);
  }

  showPickupTab(tab: string) {
    switch (tab) {
      case this.PickupTab.Bus:
        (this.form.get('pickup') as FormGroup).addControl('bus', busGroup);
        (this.form.get('pickup') as FormGroup).removeControl(FormControlName.Courier);
        break;
      case this.PickupTab.Courier:
        (this.form.get('pickup') as FormGroup).addControl(FormControlName.Courier, courierGroup);
        (this.form.get('pickup') as FormGroup).removeControl('bus');
        break;
    }
  }

  getObjectKey(object) {
    return (object instanceof Object) && Object.keys(object);
  }
}
