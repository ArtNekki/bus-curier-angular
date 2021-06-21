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
})
