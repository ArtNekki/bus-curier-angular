import {AfterViewInit, Component, OnInit} from '@angular/core';
import cities from 'src/app/mock-data/cities';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {animate, style, transition, trigger} from '@angular/animations';
import GoodsType from '../../../core/maps/GoodsType';
import {KeyValue} from '@angular/common';

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
  public currentStep = 0;
  public cities = cities;
  public form: FormGroup;
  public tags = [];
  public currentCargoIndex = 0;
  public currentCargoType = [];
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
      lastName: new FormControl(this.cities[1].value, [Validators.required]),
      // email: new FormControl('', [Validators.required]),
      // tel: new FormControl('', [Validators.required]),
      // question: new FormControl('', [Validators.required]),
      // subscribe: new FormControl('', []),
      cargo: new FormArray([new FormGroup({
        type: new FormGroup({
          docs: new FormGroup({}),
          parcels: new FormArray([
            new FormGroup({
              count: new FormControl('', []),
              weight: new FormControl('', []),
              width: new FormControl('', []),
              height: new FormControl('', []),
              length: new FormControl('', [])
            })
          ]),
          autoDetails: new FormGroup({}),
          other: new FormGroup({})
        })
      })])
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

  addCargo() {
    const group = new FormGroup({
      type: new FormGroup({
        docs: new FormGroup({}),
        parcels: new FormGroup({}),
        autoDetails: new FormGroup({}),
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
    console.log('currentCargo', this.currentCargoType);
  }

  originalOrder = (a: KeyValue<string, AbstractControl>, b: KeyValue<string, AbstractControl>): number => {
    return 0;
  }
}
