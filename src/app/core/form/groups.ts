import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import AddService from '../maps/AddService';
import FormControlName from '../maps/FormControlName';

export const parcelGroup =  new FormGroup({
  [FormControlName.PlaceCount]: new FormControl('', [Validators.required]),
  [FormControlName.Weight]: new FormControl('', [Validators.required]),
  [FormControlName.Width]: new FormControl('', [Validators.required]),
  [FormControlName.Height]: new FormControl('', [Validators.required]),
  [FormControlName.Length]: new FormControl('', [Validators.required])
});

export const individualGroup = new FormGroup({
  'last-name': new FormControl('', [Validators.required]),
  'first-name': new FormControl('', [Validators.required]),
  'middle-name': new FormControl('', [Validators.required]),
  email: new FormControl('', [Validators.required]),
  tel: new FormControl('', [Validators.required]),
  role: new FormControl('', [Validators.required]),
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
  'department-address': new FormControl('department-2', []),
  date: new FormControl('', [Validators.required])
});

export const departmentGroup = new FormGroup({
  street: new FormControl('', []),
  building: new FormControl('', []),
  apartment: new FormControl('', []),
});

export const cargoGroup = new FormArray([new FormGroup({
  [FormControlName.Type]: new FormGroup({
    [FormControlName.Docs]: new FormGroup({
      [FormControlName.PlaceCount]: new FormControl('', [Validators.required, Validators.min(1)])
    }),
    [FormControlName.Parcels]: new FormControl(''),
    [FormControlName.AutoDetails]: new FormArray([]),
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
  ['courier-time']: new FormControl('time-1', [])
});
