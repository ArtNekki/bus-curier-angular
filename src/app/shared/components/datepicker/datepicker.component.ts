import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {IAngularMyDpOptions, IMyDateModel} from 'angular-mydatepicker';
import {DeviceDetectorService} from 'ngx-device-detector';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

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
export class DatepickerComponent implements ControlValueAccessor {

  @Input() id;
  @Input() name;

  dpOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'dd.mm.yyyy'
    // other options...
  };

  constructor(public deviceService: DeviceDetectorService) { }

  changeValue(data) {
    const date = (data.singleDate && data.singleDate.formatted) || new Intl.DateTimeFormat('ru-Ru').format(new Date(data));
    this.writeValue(date);
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
