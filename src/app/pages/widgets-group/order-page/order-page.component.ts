import {AfterViewInit, Component, OnInit} from '@angular/core';
import cities from 'src/app/mock-data/cities';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {animate, style, transition, trigger} from '@angular/animations';
import GoodsType from '../../../core/maps/GoodsType';
import {KeyValue} from '@angular/common';
import {entityGroup, individualGroup, parcelGroup, senderGroup} from '../../../core/form/groups';
import AddService from '../../../core/maps/AddService';
import UserType from '../../../core/maps/UserType';
import User from 'firebase';
import DepartureTab from '../../../core/maps/DepartureTab';

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

  public cities = cities;
  public form: FormGroup;
  public tags = [];

  public currentStep = 0;
  public currentCargoIndex = 0;
  public currentUserType = UserType.Individual;
  public currentCargoType = [];
  public currentAddService = AddService.Insurance;
  public currentDepartureTab = DepartureTab.Department;
  public GoodsType = GoodsType;

  public goodsTypes = [
    { id: GoodsType.Docs, name: 'Документы'},
    { id: GoodsType.Parcels, name: 'Посылки'},
    { id: GoodsType.AutoDetails, name: 'Автозапчасти'},
    { id: GoodsType.Other, name: 'Другое'}
  ];

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      user: new FormGroup({
        individual: individualGroup
      }),
      departure: new FormGroup({
        location: new FormControl('', []),
        'department-address': new FormControl('Владивосток, Карла Маркса', []),
        department: new FormGroup({
          street: new FormControl('', []),
          building: new FormControl('', []),
          apartment: new FormControl('', []),
        }),
        courier: new FormGroup({
          street: new FormControl('', []),
          building: new FormControl('', []),
          apartment: new FormControl('', []),
          time: new FormControl('', [])
        })
      }),
      cargo: new FormArray([new FormGroup({
        type: new FormGroup({
          docs: new FormGroup({
            placeCount: new FormControl('', [])
          }),
          parcels: new FormArray([]),
          autoDetails: new FormArray([]),
          other: new FormGroup({})
        }),
        packaging: new FormGroup({
          'cardboard-box': new FormControl(),
          'transparent-film': new FormControl(),
          'safe-pack': new FormControl(),
          'black-film': new FormControl(),
          'bag-with-seal': new FormControl()
        }),
        'add-services': new FormGroup({
          [AddService.Insurance]: new FormControl('', []),
          [AddService.SmsForSender]: new FormControl('', []),
          [AddService.SmsForRecipient]: new FormControl('', [])
        })
      })]),
      recipient: new FormGroup({
        fio: new FormControl('', []),
        tel: new FormControl('', [])
      }),
      pickupPoint: new FormGroup({
        location: new FormControl('', []),
        department: new FormControl('', [])
      })
    });

    this.tags.push(`cargo-${this.tags.length + 1}`);
    this.currentCargoType.push('docs');
    // this.currentCargoType = 'docs';
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

    this.currentStep++;

    if (this.currentStep === 1 && !((this.form as FormGroup).get('sender'))) {
      (this.form as FormGroup).addControl(UserType.Sender, senderGroup);
    }
  }

  goPrev() {
    if (this.currentStep <= 0 ) {
      return;
    }

    this.currentStep--;
  }

  get cargo() {
    return this.form.get('cargo') as FormArray;
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
      type: new FormGroup({
        docs: new FormGroup({
          placeCount: new FormControl('', [])
        }),
        parcels: new FormArray([parcelGroup]),
        autoDetails: new FormArray([
          new FormControl('', [])
        ]),
        other: new FormGroup({})
      })
    });
    (this.form.get('cargo') as FormArray).push(group);

    this.currentCargoIndex = (this.form.get('cargo') as FormArray).length - 1;
    this.currentCargoType.push('docs');
  }

  deleteCargo(index: number) {
    (this.form.get('cargo') as FormArray).removeAt(index);
    this.currentCargoIndex = (this.form.get('cargo') as FormArray).length - 1;
    this.currentCargoType.splice(index, 1);
  }

  selectCargo(index: number) {
    this.currentCargoIndex = index;
  }

  selectCargoType(type: string, index) {
    this.currentCargoType.splice(index, 1, type);

    switch (type) {
      case 'docs':
        ((this.form.get('cargo') as FormArray).controls[this.currentCargoIndex].get('type').get('docs') as FormGroup).addControl('placeCount', new FormControl('', []));
        ((this.form.get('cargo') as FormArray).controls[this.currentCargoIndex].get('type').get('parcels') as FormArray).clear();
        ((this.form.get('cargo') as FormArray).controls[this.currentCargoIndex].get('type').get('autoDetails') as FormArray).clear();
        break;
      case 'parcels':
        ((this.form.get('cargo') as FormArray).controls[this.currentCargoIndex].get('type').get('parcels') as FormArray).push(parcelGroup);
        ((this.form.get('cargo') as FormArray).controls[this.currentCargoIndex].get('type').get('autoDetails') as FormArray).clear();
        ((this.form.get('cargo') as FormArray).controls[this.currentCargoIndex].get('type').get('docs') as FormGroup).removeControl('placeCount');
        break;
      case 'autoDetails':
        ((this.form.get('cargo') as FormArray).controls[this.currentCargoIndex].get('type').get('autoDetails') as FormArray).push(new FormControl('', []));
        ((this.form.get('cargo') as FormArray).controls[this.currentCargoIndex].get('type').get('parcels') as FormArray).clear();
        ((this.form.get('cargo') as FormArray).controls[this.currentCargoIndex].get('type').get('docs') as FormGroup).removeControl('placeCount');
        break;
    }
  }

  originalOrder = (a: KeyValue<string, AbstractControl>, b: KeyValue<string, AbstractControl>): number => {
    return 0;
  }

  addParcelParams() {
    ((this.form.get('cargo') as FormArray).controls[this.currentCargoIndex].get('type').get('parcels') as FormArray).push(parcelGroup);
  }

  deleteParcelParams(index: number) {
    const array = ((this.form.get('cargo') as FormArray).controls[this.currentCargoIndex].get('type').get('parcels') as FormArray);

    if (array.length <= 1) {
      return;
    }

    array.removeAt(index);
  }

  addAutoDetail() {
    const autoDetail = new FormControl('', []);

    ((this.form.get('cargo') as FormArray).controls[this.currentCargoIndex].get('type').get('autoDetails') as FormArray).push(autoDetail);
  }

  removeAutoDetail(index: number) {
    const array = ((this.form.get('cargo') as FormArray).controls[this.currentCargoIndex].get('type').get('autoDetails') as FormArray);

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
      case UserType.Individual:
        (this.form.get('user') as FormGroup).addControl(UserType.Individual, individualGroup);
        (this.form.get('user') as FormGroup).removeControl(UserType.Entity);
        break;
      case UserType.Entity:
        (this.form.get('user') as FormGroup).addControl(UserType.Entity, entityGroup);
        (this.form.get('user') as FormGroup).removeControl(UserType.Individual);
        break;
    }
  }

  setCurrentDepartureTab(tab: string) {
    this.currentDepartureTab = tab;
  }
}
