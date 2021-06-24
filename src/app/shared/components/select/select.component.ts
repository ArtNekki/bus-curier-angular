import {Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DeviceDetectorService} from 'ngx-device-detector';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

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
export class SelectComponent implements  ControlValueAccessor, OnInit {
  @ViewChild('input', {read: ElementRef}) input: ElementRef;

  @Input() id;
  @Input() items;
  @Input() mods;
  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  public cssClass = 'select';
  public isSelectOpened = false;
  public fieldValue = null;
  public value: string;

  constructor(public deviceService: DeviceDetectorService) {}

  ngOnInit(): void {
    this.setMods();
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

  setMods() {
    let allMods = '';

    if (this.mods !== 'undefined' && this.mods ) {
      const modsList = this.mods.split(',');
      for (const item of modsList) {
        allMods = allMods + ' btn--' + item.trim();
      }
    }

    this.cssClass += allMods;
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
