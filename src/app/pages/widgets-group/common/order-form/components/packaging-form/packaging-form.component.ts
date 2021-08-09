import {ChangeDetectorRef, Component, forwardRef, OnInit} from '@angular/core';
import formFieldMeta from '../../../../../../core/form/formFieldMeta';
import {FormArray, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {FormUtilsService} from '../../../../../../core/services/form-utils.service';
import {UtilsService} from '../../../../../../core/services/utils.service';
import {OrderFormService} from '../../../../../../core/services/order-form/order-form.service';
import {SubFormComponent} from '../sub-form/sub-form.component';
import FormControlName from 'src/app/core/maps/FormControlName';
import fadeIn from '../../../../../../core/animations/fadeIn';
import {switchMap} from 'rxjs/operators';
import {CalculatorService} from '../../../../../../core/services/calculator/calculator.service';

interface Service {
  id: string;
  name: string;
  price: string;
  group_id: string;
}

@Component({
  selector: 'app-packaging-form',
  templateUrl: './packaging-form.component.html',
  styleUrls: ['./packaging-form.component.scss'],
  animations: [fadeIn],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PackagingFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PackagingFormComponent),
      multi: true
    }
  ]
})
export class PackagingFormComponent extends SubFormComponent implements OnInit {
  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;

  public formGroup: FormGroup;
  public formattedData = {};

  constructor(public formUtils: FormUtilsService,
              public utils: UtilsService,
              private calcService: CalculatorService,
              private cdr: ChangeDetectorRef,
              protected orderForm: OrderFormService) {
    super(orderForm);
  }

  ngOnInit(): void {

    this.formGroup = new FormGroup({
      items: new FormArray([])
    });

    this.orderForm.cityFrom$.pipe(
      switchMap((id: string) => {
        return this.calcService.getServices(id);
      })
    ).subscribe((arr: Array<Service>) => {
      arr.filter((item: Service) => item.group_id === '1')
         .forEach((item: Service) => {
          this.formattedData[item.id] = { name: item.name, price: item.price };

          (this.formGroup.get('items') as FormArray).push(new FormGroup({
            [item.id]: new FormControl(''),
            [FormControlName.Counter]: new FormControl('')
          }));
        });
    });
  }

  public get items(): FormArray {
    return this.formGroup.get('items') as FormArray;
  }
}
