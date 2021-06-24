import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
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
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  @Input() checked: boolean;
  @Input() id: string;
  @Input() data: any;
  @Input() name: string;
  @Input() mods;

  public cssClass;
  public value;

  constructor(private modsService: ModsService) { }

  ngOnInit(): void {
    this.cssClass = this.modsService.setMods('radio', this.mods);
  }

  onChange: (_: any) => void = (_: any) => {};
  onTouched: () => void = () => {};

  changeValue(id) {
    this.value = id;
    this.onChange(id);
    this.change.emit(id || this.checked);
    console.log('value', id);
  }

  writeValue(value: any): void {
    this.value = value;
    this.change.emit(value);
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }
}
