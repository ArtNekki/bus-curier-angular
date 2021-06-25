import {Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ModsService} from '../../../core/services/mods.service';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import State from '../../../core/maps/State';

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
export class CounterComponent implements ControlValueAccessor, OnInit, OnChanges {
  @Input() mods;

  public cssClass;
  public currentCount = 0;
  public isInvalid = false;

  constructor(private modsService: ModsService) { }

  ngOnInit(): void {
    this.cssClass = this.modsService.setMods('counter', this.mods);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.mods) {
      if (changes.mods.currentValue === State.Invalid) {
        this.isInvalid = true;
      } else {
        this.isInvalid = false;
      }
    }
  }

  changeValue(count) {
    this.currentCount = count;
    this.onChange(count);
  }

  writeValue(count) {
    this.currentCount = count || 0;
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
