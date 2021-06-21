import {FormControl, FormGroup} from '@angular/forms';

export const parcelGroup = new FormGroup({
  count: new FormControl('', []),
  weight: new FormControl('', []),
  width: new FormControl('', []),
  height: new FormControl('', []),
  length: new FormControl('', [])
});

export const individualGroup = new FormGroup({
  'last-name': new FormControl('', []),
  'first-name': new FormControl('', []),
  'middle-name': new FormControl('', []),
  email: new FormControl('', []),
  tel: new FormControl('', []),
  role: new FormControl('', []),
});

export const entityGroup = new FormGroup({
  name: new FormControl('', []),
  address: new FormControl('', []),
  tel: new FormControl('', []),
});

export const senderGroup = new FormGroup({
  fio: new FormControl('', []),
  doc: new FormControl('', []),
  'doc-number': new FormControl('', []),
  tel: new FormControl('', []),
});

export const departureGroup = new FormGroup({
  location: new FormControl('', []),
  'department-address': new FormControl('Владивосток, Карла Маркса', []),
  date: new FormControl('', [])
});

export const departmentGroup = new FormGroup({
  street: new FormControl('', []),
  building: new FormControl('', []),
  apartment: new FormControl('', []),
});

export const courierGroup = new FormGroup({
  street: new FormControl('', []),
  building: new FormControl('', []),
  apartment: new FormControl('', []),
  time: new FormControl('', [])
});
