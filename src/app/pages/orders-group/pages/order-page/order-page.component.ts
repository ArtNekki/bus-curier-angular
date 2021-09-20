import {Component, OnInit} from '@angular/core';
import fadeIn from '../../../../core/animations/fadeIn';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
  animations: [fadeIn]
})

export class OrderPageComponent implements OnInit {
  ngOnInit(): void {
  }
}
