import { Component, OnInit } from '@angular/core';
import cities from 'src/app/mock-data/cities';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {animate, style, transition, trigger} from '@angular/animations';
import GoodsType from '../../../core/maps/GoodsType';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
  animations: [trigger('tag', [
    transition('void => *', [
      style({opacity: 0}),
      animate('200ms')
    ])
  ])]
})
export class OrderPageComponent implements OnInit {
  public currentStep = 0;
  public cities = cities;
  public form: FormGroup;
  public tags = [];
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

  addTag() {
    this.tags.push(`cargo-${this.tags.length + 1}`);
    console.log('tags', this.tags);
  }

  deleteTag(tag: any) {
    const index = this.tags.indexOf(tag);
    this.tags.splice(index, 1);
    console.log('tags', this.tags);
  }

  selectGoodsType(type: { name: string; id: string }) {
    this.currentGoodsType = type;
  }
}
