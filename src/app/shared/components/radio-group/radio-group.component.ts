import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true
    }
  ]
})

export class RadioGroupComponent implements ControlValueAccessor, OnInit {
  @Input() items: any;
  @Input() name: string;

  public id;

  constructor() { }

  ngOnInit(): void {
  }

  changeValue(id) {
    this.id = id;
    this.onChange(id);
    // this.change.emit(id || this.checked);
  }

  writeValue(value: any): void {
    this.id = value;
    // this.change.emit(value);
  }

  onChange: any = (data) => {

  }

  onTouched: any = () => {

  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }
}
