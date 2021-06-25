import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors} from '@angular/forms';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-packaging',
  templateUrl: './packaging.component.html',
  styleUrls: ['./packaging.component.scss']
})
export class PackagingComponent implements OnInit {
  public formGroup: FormGroup;
  public ControlName = {
    CardBox: 'cardboard-box',
    TransparentFilm: 'transparent-film',
    SafePack: 'safe-pack',
    BlackFilm: 'black-film',
    BagWithSeal: 'bag-with-seal'
  };

  constructor() { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
        [this.ControlName.CardBox]: new FormControl(''),
        [this.ControlName.TransparentFilm]: new FormControl(''),
        [this.ControlName.SafePack]: new FormControl(''),
        [this.ControlName.BlackFilm]: new FormControl(''),
        [this.ControlName.BagWithSeal]: new FormControl(''),
    });
  }

  // public get items(): FormArray {
  //   return this.formGroup.get('items') as FormArray;
  // }

  public onTouched: () => void = () => {};

  writeValue(value: any): void {
    if (value) {
      this.formGroup.setValue(value, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.formGroup.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  // setDisabledState?(isDisabled: boolean): void {
  //   isDisabled ? this.formGroup.disable() : this.formGroup.enable();
  // }

  validate(c: AbstractControl): ValidationErrors | null {
    return this.formGroup.valid ? null : { invalidForm: {valid: false, message: 'packaging are invalid'}};
  }
}
