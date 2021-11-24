import {Component, EventEmitter, forwardRef, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {ModsService} from '../../../../../../core/services/mods.service';
import {FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import fadeIn from '../../../../../../core/animations/fadeIn';
import {startWith} from 'rxjs/operators';

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
  @Input() data;
  @Input() type;
  @Input() title: string;
  @Input() mods;

  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  @Output() ok: EventEmitter<any> = new EventEmitter<any>();

  public cssClass;
  public counter: FormControl;

  public Package = {
    box: 'Коробка',
    ['safe-pack']: 'Сейф-пакет',
    ['plastic-pack']: 'Пластиковый пакет',
    skins: 'Пленка',
    other: 'Другое'
  };

  constructor(private modsService: ModsService) { }

  ngOnInit(): void {
    this.cssClass = this.modsService.setMods('package-modal', this.mods);
    this.counter = new FormControl(0);
  }

  onOk() {
    this.changeValue(this.counter.value);
    this.ok.emit(this.counter.value);
  }

  onClose() {
    this.close.emit();
  }

  changeValue(value) {
    this.onChange(value);
  }

  writeValue(value) {
    this.counter.setValue(value || 1);
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
