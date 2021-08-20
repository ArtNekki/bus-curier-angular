import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ModsService} from '../../../core/services/mods.service';
import {OrderReportService} from '../../../core/services/order-report/order-report.service';
import formFieldMeta from '../../../core/form/formFieldMeta';
import FormControlName from 'src/app/core/maps/FormControlName';
import {FormUtilsService} from '../../../core/services/form-utils.service';

@Component({
  selector: 'app-order-result',
  templateUrl: './order-result.component.html',
  styleUrls: ['./order-result.component.scss']
})
export class OrderResultComponent implements OnInit, OnChanges {
  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  @Input() mods;
  @Input() data;

  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;

  public cssClass;
  public currentData;
  public isLoading = false;
  public isDirty = false;

  constructor(
    public orderReport: OrderReportService,
    public formUtils: FormUtilsService,
    private modsService: ModsService) {

    this.cssClass = this.modsService.setMods('order-result', this.mods);
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {

    // if (changes.data.currentValue) {
    //   this.currentData = changes.data.currentValue;
    //
    //   if ((this.getDepartureCity(this.currentData)
    //       && this.getPickupCity(this.currentData)
    //       && this.getCargoList(this.currentData)) && !this.isDirty
    //   ) {
    //     this.isLoading = true;
    //     this.isDirty = true;
    //     this.change.emit(true);
    //
    //     setTimeout(() => {
    //       this.isLoading = false;
    //     }, 1000);
    //   }
    // }
  }
  //
  // getCargoList(data) {
  //   return data.steps[2]['cargo-group'] && data.steps[2]['cargo-group'].items;
  // }
  //
  // getDepartureCity(data) {
  //   return data.steps[1][FormControlName.DeparturePoint].location;
  // }
  //
  // getPickupCity(data) {
  //   return data.steps[2][FormControlName.PickupPoint].location;
  // }
  //
  // getDispatchType(data) {
  //   const dispatchData = data.steps[1][FormControlName.DeparturePoint][FormControlName.DispatchData];
  //
  //   if (!dispatchData) {
  //     return;
  //   }
  //
  //   return dispatchData[FormControlName.Active];
  // }
  //
  // getReceiveType(data) {
  //   const pickupData = data.steps[2][FormControlName.PickupPoint][FormControlName.ReceiveData];
  //
  //   if (!pickupData) {
  //     return;
  //   }
  //
  //   return pickupData[FormControlName.Active];
  // }
  //
  // formatDocs(item: any) {
  //   return `Документы (мест: ${item[FormControlName.PlaceCount]})`;
  // }
  //
  // formatParcels(arr: any) {
  //   return `Посылки (мест: ${arr.length} шт)`;
  // }
  //
  // formatAutoparts(item: any) {
  //   if (!item) {
  //     return;
  //   }
  //
  //   return item.join(', ');
  // }
  //
  // formatCargo(cargo: any) {
  //   let result = null;
  //
  //   switch (cargo.activeItem) {
  //     case FormControlName.Docs:
  //       result = this.formatDocs(cargo.items[FormControlName.Docs]);
  //       break;
  //     case FormControlName.Parcels:
  //       result = this.formatParcels(cargo.items[FormControlName.Parcels]);
  //       break;
  //     case FormControlName.AutoParts:
  //       result = this.formatAutoparts(cargo.items[FormControlName.AutoParts]);
  //       break;
  //   }
  //
  //   return result;
  // }
  //
  // formatPackaging(data) {
  //   const packaging = data.steps[2][FormControlName.Packaging];
  //
  //   if (!packaging) {
  //     return;
  //   }
  //
  //   const result = packaging.items
  //     .filter((item) => {
  //       return item.counter > 0 && item;
  //     })
  //     .map((el) => {
  //       const label = this.FormFieldMeta[Object.keys(el)[0]].label;
  //       return {label: label.toString(), count: `(${el.counter} шт.)`, sum: `120 руб.`};
  //     });
  //
  //   return result;
  // }
  //
  // formatServices(data) {
  //   const services = data.steps[2][FormControlName.Services];
  //
  //   if (!services) {
  //     return;
  //   }
  //
  //   const result = Object.entries(services).map((el) => {
  //     return {id: el[0], label: this.FormFieldMeta[el[0]].label, value: Object.values(el[1])[1], sum: '200 руб.'};
  //   });
  //
  //   return result;
  // }
}
