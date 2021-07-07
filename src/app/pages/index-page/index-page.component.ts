import { Component, OnInit } from '@angular/core';
import {CalculatorService} from '../../core/services/calculator/calculator.service';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent implements OnInit {

  constructor(private calculatorService: CalculatorService) { }

  ngOnInit(): void {
    this.calculatorService.getDistricts('1').subscribe((result) => {
      console.log('result', result);
    });
  }

}
