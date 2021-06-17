import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ModsService} from '../../../core/services/mods.service';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioComponent),
    multi: true
  }]
})
export class RadioComponent implements ControlValueAccessor, OnInit {
  @Input() checked: boolean;
  @Input() id: string;
  @Input() name: string;
  @Input() mods;

  public cssClass;
  value = false;

  constructor(private modsService: ModsService) { }

  ngOnInit(): void {
    this.cssClass = this.modsService.setMods('radio', this.mods);
  }

  onChange: (_: any) => void = (_: any) => {};
  onTouched: () => void = () => {};

  changeValue(value) {
    this.writeValue(value);
    // this.change.emit(value);
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
}
