import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ModsService} from '../../../core/services/mods.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor, OnInit {
  @Input() id: string;
  @Input() name: string;
  @Input() type: string;
  @Input() placeholder = '';
  @Input() rows = 5;
  @Input() mods;

  public cssClass;

  constructor(private modsService: ModsService) { }

  ngOnInit(): void {
    this.cssClass = this.modsService.setMods('input', this.mods);
  }

  changeValue(data) {
    // const date = (data.singleDate && data.singleDate.formatted) || new Intl.DateTimeFormat('ru-Ru').format(new Date(data));
    // this.writeValue(date);
  }

  writeValue(value) {
    // this.value = value;
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
}
