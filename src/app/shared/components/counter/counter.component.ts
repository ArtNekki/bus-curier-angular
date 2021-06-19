import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ModsService} from '../../../core/services/mods.service';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CounterComponent),
      multi: true
    }
  ]
})
export class CounterComponent implements ControlValueAccessor, OnInit {
  @Input() mods;

  public cssClass;
  public currentCount = 0;

  constructor(private modsService: ModsService) { }

  ngOnInit(): void {
    this.cssClass = this.modsService.setMods('counter', this.mods);
  }

  changeValue(data) {
    this.writeValue(data);
  }

  writeValue(value) {
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

  countUp() {
    this.currentCount++;
    this.changeValue(this.currentCount);
  }

  countDown() {
    if (this.currentCount <= 0) {
      return;
    }

    this.currentCount--;
    this.changeValue(this.currentCount);
  }
}
