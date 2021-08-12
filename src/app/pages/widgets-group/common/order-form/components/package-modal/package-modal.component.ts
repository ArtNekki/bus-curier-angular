import {Component, EventEmitter, forwardRef, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {ModsService} from '../../../../../../core/services/mods.service';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import fadeIn from '../../../../../../core/animations/fadeIn';

@Component({
  selector: 'app-package-modal',
  templateUrl: './package-modal.component.html',
  styleUrls: ['./package-modal.component.scss'],
  animations: [fadeIn],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PackageModalComponent),
      multi: true
    }
  ]
})
export class PackageModalComponent implements OnInit {
  @Input() title: string;
  @Input() mods;

  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  @Output() ok: EventEmitter<any> = new EventEmitter<any>();

  public cssClass;
  public currentValue = '';
  public value = '';

  constructor(private modsService: ModsService) { }

  ngOnInit(): void {
    this.cssClass = this.modsService.setMods('package-modal', this.mods);
  }

  onOk() {
    const value = this.currentValue || this.value;

    this.changeValue(value);
    this.ok.emit(value);
  }

  onClose() {
    this.close.emit();
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
}
