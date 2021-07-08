import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ModsService} from '../../../core/services/mods.service';
import {OrderReportService} from '../../../core/services/order-report/order-report.service';
import formFieldMeta from '../../../core/form/formFieldMeta';
import FormControlName from 'src/app/core/maps/FormControlName';

@Component({
  selector: 'app-order-result',
  templateUrl: './order-result.component.html',
  styleUrls: ['./order-result.component.scss']
})
export class OrderResultComponent implements OnInit, OnChanges {
  @Input() mods;
  @Input() data;

  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;

  public cssClass;
  public currentData;

  constructor(
    public orderReport: OrderReportService,
    private modsService: ModsService) {

    this.cssClass = this.modsService.setMods('order-result', this.mods);
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.currentValue) {
      this.currentData = changes.data.currentValue;
    }

    console.log('nekki');
  }

  getCargoList(data) {
    return data.steps[2]['cargo-group'];
  }

  getCurrentCargo(items: any) {
    const cargo = Object.entries(items).filter((item: [string, string]) => {
      return (item.length && item[1]) && item;
    });

    if (cargo.length) {
      return {
        type: cargo[0][0],
        items: cargo[0][1]
      };
    } else {
      return {};
    }
  }

  getDepartureCity(data) {
    return data.steps[1][FormControlName.DeparturePoint].location;
  }

  getPickupCity(data) {
    return data.steps[2][FormControlName.PickupPoint].location;
  }

  formatDocs(item: any) {
    return `(мест: ${item[FormControlName.PlaceCount]})`;
  }

  formatParcels(arr: any) {
    return `(${arr.length} шт)`;
  }

  formatAutoparts(item: any) {
    return item.join(', ');
  }
}
