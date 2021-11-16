import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { shops } from 'src/app/mock-data/slider';

@Component({
  selector: 'app-delivery-from-airport-page',
  templateUrl: './delivery-from-airport-page.component.html',
  styleUrls: ['./delivery-from-airport-page.component.scss']
})
export class DeliveryFromAirportPageComponent implements OnInit {
  public phoneNumber = '';
  public icons = [
    {
      icon: 'aeroflot-2',
      mods: 'aeroflot-2, shadow-right'
    },
    {
      icon: 'aurora',
      mods: 'aurora'
    },
    {
      icon: 'eastjet',
      mods: 'eastjet'
    },
    {
      icon: 's7',
      mods: 's7'
    }
  ];


  constructor(private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.phoneNumber = this.localStorage.get('phone-number');
  }
}
