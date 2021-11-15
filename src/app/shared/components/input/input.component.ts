import {AfterViewInit, Component, ElementRef, forwardRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import State from 'src/app/core/maps/State';
import {ModsService} from '../../../core/services/mods.service';
import {Pattern} from '../../../core/pattern/pattern';

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
export class InputComponent implements ControlValueAccessor, OnInit, OnChanges {
  @ViewChild('editContent', {read: ElementRef}) editContent: ElementRef;

  @Input() id: string;
  @Input() name: string;
  @Input() type: string;
  @Input() unit: string;
  @Input() mask: string;
  @Input() prefix = '';
  @Input() suffix = '';
  @Input() placeholder = '';
  @Input() rows = 5;
  @Input() mods;
  @Input() isInvalid = false;
  @Input() isValid = false;
  @Input() maxlength: number;
  @Input() dropSpecialCharacters: boolean;
  @Input() showMaskTyped = false;

  public Pattern = Pattern;

  public cssClass;
  public isFocused = false;
  public touched = false;
  public value = '';

  constructor(private modsService: ModsService) { }

  ngOnInit(): void {
    this.cssClass = this.modsService.setMods('input', this.mods);

    this.maxlength = !this.maxlength ?
      this.type === 'text' ? 100 : this.type === 'number' ? 8 : 100 : this.maxlength;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes.mods) {
    //   if (changes.isInvalid.currentValue === State.Invalid) {
    //     this.isInvalid = true;
    //   } else {
    //     this.isInvalid = false;
    //   }
    // }
  }

  changeValue(value) {
    this.value = value;
    this.onChange(value);
    // this.onTouched();
  }

  writeValue(value) {
    this.value = value;
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

  onFocus() {
    this.isFocused = true;
    this.editContent.nativeElement.focus();

    const length = this.editContent.nativeElement.textContent.length;

    this.setCursor(length);
  }

  onBlur() {
    this.isFocused = false;
    this.markAsTouched();
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

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }

    this.onTouched();
  }

  check(field: any, event: any) {

    if (field.value.length > this.maxlength) {
      event.preventDefault();
      event.stopPropagation();
    }

    const ok = new RegExp(field.pattern).test(field.value);

    if (!ok) {
      // event.preventDefault();
      // event.stopPropagation();
    }
  }
}
