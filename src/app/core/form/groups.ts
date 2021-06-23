import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import AddService from '../maps/AddService';

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
  'company-name': new FormControl('', []),
  address: new FormControl('', []),
  tel: new FormControl('', []),
});

export const senderGroup = new FormGroup({
  fio: new FormControl('', [Validators.required, Validators.email]),
  doc: new FormControl('', []),
  'doc-number': new FormControl('', [Validators.required, Validators.pattern('0000 000000')]),
  tel: new FormControl('', []),
});

export const departureGroup = new FormGroup({
  location: new FormControl('', []),
  'department-address': new FormControl('', []),
  date: new FormControl('', [])
});

export const departmentGroup = new FormGroup({
  street: new FormControl('', []),
  building: new FormControl('', []),
  apartment: new FormControl('', []),
});

export const cargoGroup = new FormArray([new FormGroup({
  type: new FormGroup({
    docs: new FormGroup({
      placeCount: new FormControl('', [])
    }),
    parcels: new FormArray([]),
    autoDetails: new FormArray([]),
    other: new FormGroup({})
  }),
  packaging: new FormGroup({
    'cardboard-box': new FormControl(),
    'transparent-film': new FormControl(),
    'safe-pack': new FormControl(),
    'black-film': new FormControl(),
    'bag-with-seal': new FormControl()
  }),
  'add-services': new FormGroup({
    [AddService.Insurance]: new FormControl('', []),
    [AddService.SmsForSender]: new FormControl('', []),
    [AddService.SmsForRecipient]: new FormControl('', [])
  })
})]);

export const recipientGroup = new FormGroup({
  fio: new FormControl('', []),
  tel: new FormControl('', [])
});

export const pickupGroup = new FormGroup({
  location: new FormControl('', []),
  'department-address': new FormControl('', [])
});

export const busGroup = new FormGroup({
  street: new FormControl('', []),
  building: new FormControl('', []),
  apartment: new FormControl('', []),
});

export const courierGroup = new FormGroup({
  street: new FormControl('', []),
  building: new FormControl('', []),
  apartment: new FormControl('', []),
  ['courier-time']: new FormControl('', [])
});
