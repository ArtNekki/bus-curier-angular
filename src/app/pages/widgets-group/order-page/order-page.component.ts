import { Component, OnInit } from '@angular/core';
import cities from 'src/app/mock-data/cities';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {animate, style, transition, trigger} from '@angular/animations';
import GoodsType from '../../../core/maps/GoodsType';

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
export class OrderPageComponent implements OnInit {
  public currentStep = 0;
  public cities = cities;
  public form: FormGroup;
  public tags = [];
  public currentCargo = null;
  public currentGoodsType = null;
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
      cargo: new FormArray([])
    });

    this.tags.push(`cargo-${this.tags.length + 1}`);
    this.currentGoodsType = this.goodsTypes[0];
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

  addCargo() {
    const group = new FormGroup({});
    (this.form.get('cargo') as FormArray).push(group);

    this.currentCargo = (this.form.get('cargo') as FormArray).length - 1;
  }

  get cargo() {
    return this.form.get('cargo') as FormArray;
  }

  deleteCargo(index: number) {
    (this.form.get('cargo') as FormArray).removeAt(index);
    this.currentCargo = (this.form.get('cargo') as FormArray).length - 1;
  }

  selectCargo(index: number) {
    this.currentCargo = index;
    console.log('cargo 222', this.currentCargo);
  }

  selectGoodsType(type: { name: string; id: string }) {
    this.currentGoodsType = type;
  }
}
