import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
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

  @Input() id;
  @Input() items;
  @Input() mods;
  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  public cssClass = 'select';
  public isSelectOpened = false;
  public currentItem = null;
  value: string;

  constructor(public deviceService: DeviceDetectorService) { }

  changeValue(data) {
    let value = null;

    if (data.stopPropagation) {
      data.stopPropagation();
      value = data.target.value;
    } else {
      value = data.value;
    }

    this.writeValue(value);
    this.change.emit(value);
  }

  writeValue(value) {
    this.value = value;
    this.onChange(value);
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

  ngOnInit(): void {
    this.setMods();
  }

  openSelect() {
    this.isSelectOpened = true;
  }

  closeSelect() {
    this.isSelectOpened = false;
  }

  selectItem(item) {
    this.currentItem = item;
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
}
