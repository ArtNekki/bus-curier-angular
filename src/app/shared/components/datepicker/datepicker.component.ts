import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {IAngularMyDpOptions, IMyDateModel} from 'angular-mydatepicker';
import {DeviceDetectorService} from 'ngx-device-detector';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ModsService} from '../../../core/services/mods.service';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true
    }
  ]
})
export class DatepickerComponent implements ControlValueAccessor, OnInit {

  @Input() id;
  @Input() name;
  @Input() mods;

  public cssClass;
  public value;

  dpOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'dd.mm.yyyy'
    // other options...
  };

  constructor(public deviceService: DeviceDetectorService, private modsService: ModsService) { }

  ngOnInit(): void {
    this.cssClass = this.modsService.setMods('datepicker', this.mods);
  }

  changeValue(date) {
    date = (date.singleDate && date.singleDate.formatted) || new Intl.DateTimeFormat('ru-Ru').format(new Date(date));
    this.value = date;
    console.log('date', this.value);
    this.onChange(date.toString());
  }

  writeValue(value) {
    this.value = value;
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
