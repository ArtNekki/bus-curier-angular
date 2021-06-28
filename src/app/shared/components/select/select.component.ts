import {Component, ElementRef, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {DeviceDetectorService} from 'ngx-device-detector';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import State from '../../../core/maps/State';
import {ModsService} from '../../../core/services/mods.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements  ControlValueAccessor, OnInit, OnChanges {
  @ViewChild('input', {read: ElementRef}) input: ElementRef;

  @Input() id;
  @Input() items;
  @Input() mods;
  @Input() isInvalid = false;

  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  public cssClass;
  public isSelectOpened = false;
  public fieldValue = null;
  public value: string;

  constructor(public deviceService: DeviceDetectorService, private modsService: ModsService) {}

  ngOnInit(): void {
    this.cssClass = this.modsService.setMods('input', this.mods);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes.mods) {
    //   if (changes.mods.currentValue === State.Invalid) {
    //     this.isInvalid = true;
    //   } else {
    //     this.isInvalid = false;
    //   }
    // }
  }

  changeValue(value) {
    this.value = value;
    this.onChange(value);

    this.setFieldValue();
  }

  writeValue(value) {
    this.value = value;
    this.setFieldValue();
  }

  onChange: any = () => {

  }

  onTouched: any = () => {

  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  openSelect() {
    this.isSelectOpened = true;
  }

  closeSelect() {
    this.isSelectOpened = false;
  }

  setFieldValue() {
    const selectItem = this.items.filter((item) => {
      return item.value === this.value;
    })[0];

    if (selectItem) {
      this.fieldValue = selectItem.name;
    }
  }
}
