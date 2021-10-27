import {Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CalAnimation, IAngularMyDpOptions, IMyDate, IMyDateModel} from 'angular-mydatepicker';
import {DeviceDetectorService} from 'ngx-device-detector';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ModsService} from '../../../core/services/mods.service';
import State from '../../../core/maps/State';

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
export class DatepickerComponent implements ControlValueAccessor, OnInit, OnChanges {

  @Input() id;
  @Input() name;
  @Input() mods;
  @Input() isInvalid = false;

  public dpOptions: IAngularMyDpOptions;

  public cssClass: string;
  public value: string;

  constructor(public deviceService: DeviceDetectorService, private modsService: ModsService) { }

  ngOnInit(): void {
    this.cssClass = this.modsService.setMods('datepicker', this.mods);
    this.setOptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes.mods) {
    //   if (changes.mods.currentValue === State.Invalid) {
    //     this.isInvalid = true;
    //   } else {
    //     this.isInvalid = false;
    //   }
    // }
  }

  setOptions() {
    this.dpOptions = {
      dateRange: false,
      dateFormat: 'dd.mm.yyyy',
      // calendarAnimation: {
      //   in: CalAnimation.ScaleTop,
      //   out: CalAnimation.ScaleCenter
      // },
      disableUntil: this.disableUntil(),
      stylesData: {
        selector: 'dp1',
        styles: `
       .dp1 .myDpIconLeftArrow,
       .dp1 .myDpIconRightArrow,
       .dp1 .myDpHeaderBtn {
          color: #6c757d;
       }
       .dp1 .myDpHeaderBtn:focus,
       .dp1 .myDpMonthLabel:focus,
       .dp1 .myDpYearLabel:focus {
          color: #aaa;
       }
       .dp1 .myDpDaycell:focus,
       .dp1 .myDpMonthcell:focus,
       .dp1 .myDpYearcell:focus {
          box-shadow: inset 0 0 0 1px #ccc;
       }
       .dp1 .myDpSelector:focus {
          box-shadow: -1px 1px 6px 0px #bbb;
       }
       .dp1 .myDpSelectorArrow:focus:before {
          border-bottom-color: #bbb;
       }
       .dp1 .myDpCurrMonth,
       .dp1 .myDpMonthcell,
       .dp1 .myDpYearcell {
          color: #6c757d;
          font-weight: bold;
       }
       .dp1 .myDpDaycellWeekNbr {
          color: #6c757d;
       }
       .dp1 .myDpPrevMonth,
       .dp1 .myDpNextMonth {
          color: #aaa;
       }
       .dp1 .myDpWeekDayTitle {
          background-color: transparent;
          color: #6c757d;
          font-weight: bold;
       }
       .dp1 .myDpHeaderBtnEnabled:hover,
       .dp1 .myDpMonthLabel:hover,
       .dp1 .myDpYearLabel:hover,
       .dp1 .myDpFooterBtn:hover {
          color: #212529;
       }
       .dp1 .myDpMarkCurrDay,
       .dp1 .myDpMarkCurrMonth,
       .dp1 .myDpMarkCurrYear {
          border-bottom: 2px solid #6c757d;
       }
       .dp1 .myDpDisabled {
          color: #999;
       }
       .dp1 .myDpHighlight {
          color: #cd5c5c;
       }
       .dp1 .myDpTableSingleDay:hover,
       .dp1 .myDpTableSingleMonth:hover,
       .dp1 .myDpTableSingleYear:hover {
          background-color: #ccc;
          color: #222;
       }
       .dp1 .myDpRangeColor {
          background-color: #eee;
       }
       .dp1 .myDpSelectedDay,
       .dp1 .myDpSelectedMonth,
       .dp1 .myDpSelectedYear {
          background-color: #ccc;
          color: #222;
       }`
      }};
  }

  disableUntil() {
    const date = new Date();
    date.setDate(date.getDate() - 1);

    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      };
  }

  changeValue(date) {
    date = (date.singleDate && date.singleDate.formatted) || new Intl.DateTimeFormat('ru-Ru').format(new Date(date));
    this.value = date;
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
