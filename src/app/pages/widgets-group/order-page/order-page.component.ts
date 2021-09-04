import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {animate, style, transition, trigger} from '@angular/animations';
import FormControlName from '../../../core/maps/FormControlName';
import {OrderFormService} from '../../../core/services/order-form/order-form.service';
import {AuthService} from '../../../core/services/auth/auth.service';
import fadeIn from '../../../core/animations/fadeIn';
import {Router} from '@angular/router';

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
