import {FormControl, FormGroup} from '@angular/forms';

export const parcelGroup = new FormGroup({
  count: new FormControl('', []),
  weight: new FormControl('', []),
  width: new FormControl('', []),
  height: new FormControl('', []),
  length: new FormControl('', [])
});
