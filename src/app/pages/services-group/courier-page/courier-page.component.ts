import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';



// ,
// [
//   '<app-link [href]="/">rr</app-link>',
//   '',
//   '',
//   ' <a href=\'tel: 8(423)2937879\' class=\'link link--blue link--no-underline link--in-text\'><span class=\'link__text\'></span></a>'
// ]

@Component({
  selector: 'app-courier-page',
  templateUrl: './courier-page.component.html',
  styleUrls: ['./courier-page.component.scss']
})
export class CourierPageComponent implements OnInit {
  public phoneNumber = '';
  public cities = [
    'Владивосток (забор и доставка груза)',
    'Уссурийск (забор и доставка груза)',
    'Находка (забор и доставка груза)',
    'Дальнегорск (только доставка груза по будням)',
    'Спасск-Дальний (только доставка)',
    'Арсеньев (только доставка)',
    'Хабаровск (забор и доставка)'
  ];

  constructor(private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.phoneNumber = this.localStorage.get('phone-number');
  }

}
