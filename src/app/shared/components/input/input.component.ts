import {AfterViewInit, Component, ElementRef, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
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
  @ViewChild('editContent', {read: ElementRef}) editContent: ElementRef;

  @Input() id: string;
  @Input() name: string;
  @Input() type: string;
  @Input() unit: string;
  @Input() placeholder = '';
  @Input() rows = 5;
  @Input() mods;

  public cssClass;
  public isFocused = false;

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

  onFocus() {
    this.isFocused = true;
    this.editContent.nativeElement.focus();

    const length = this.editContent.nativeElement.textContent.length;

    this.setCursor(length);
  }

  onBlur() {
    this.isFocused = false;
  }

  setCursor(pos) {
    const range = document.createRange();
    const selection = window.getSelection();

    if (this.editContent.nativeElement.childNodes[0]) {
      range.setStart(this.editContent.nativeElement.childNodes[0], pos);
      range.collapse(true);
    }

    selection.removeAllRanges();
    selection.addRange(range);
  }
}
