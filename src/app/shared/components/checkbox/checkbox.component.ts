import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxComponent),
    multi: true
  }]
})
export class CheckboxComponent implements ControlValueAccessor, OnInit {

  @Input() id;
  @Input() name;
  @Input() mods;
  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  public cssClass = 'checkbox';
  value = false;

  constructor() {

  }

  onChange: (_: any) => void = (_: any) => {};
  onTouched: () => void = () => {};

  changeValue(value) {
    this.writeValue(value);
    this.change.emit(value);
  }

  writeValue(value: boolean): void {
    this.value = value;
    this.onChange(this.value);
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

  setMods() {
    let allMods = '';

    if (this.mods !== 'undefined' && this.mods ) {
      const modsList = this.mods.split(',');
      for (const item of modsList) {
        allMods = allMods + ' checkbox--' + item.trim();
      }
    }

    this.cssClass += allMods;
  }
}
