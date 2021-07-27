import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ModsService} from '../../../core/services/mods.service';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TagComponent),
    multi: true
  }]
})
export class TagComponent implements ControlValueAccessor, OnInit {
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();
  // @Output() change: EventEmitter<any> = new EventEmitter<any>();

  @Input() type: string;
  @Input() isInvalid: boolean;
  @Input() index: any;
  @Input() checked: boolean;
  @Input() mods;

  public cssClass;
  public value;

  constructor(private modsService: ModsService) { }

  ngOnInit(): void {
    this.cssClass = this.modsService.setMods('tag', this.mods);
  }

  onDelete(index) {
    this.delete.emit(index);
  }

  onChange: (_: any) => void = (_: any) => {};
  onTouched: () => void = () => {};

  changeValue(index) {
    this.value = index;
    this.onChange(index);
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  // selectTag(e, index: any) {
  //   e.stopPropagation();
  //   this.change.emit(index);
  // }
}
