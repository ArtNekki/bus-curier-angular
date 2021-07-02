import { Component, OnInit } from '@angular/core';
import cities from 'src/app/mock-data/cities';
import formFieldMeta from '../../../../core/form/formFieldMeta';
import fieldError from '../../../../core/form/fieldError';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import FormControlName from 'src/app/core/maps/FormControlName';
import {UtilsService} from '../../../../core/services/utils.service';

@Component({
  selector: 'app-account-report-page',
  templateUrl: './account-report-page.component.html',
  styleUrls: ['./account-report-page.component.scss']
})
export class AccountReportPageComponent implements OnInit {
  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;
  public FormFieldError = fieldError;

  public form: FormGroup;

  public cities = cities;
  public tableHead = [
    'Заказ',
    'Дата заказа',
    'Отправитель',
    'Получатель',
    'Город отправления',
    'Город получения',
    'Стоимость'];
  public tableBody = [
    ['№ 614933', '2020-04-03', 'Ким-Мельникова А.А.', 'Петрухи А.А.', 'Владивосток', 'Уссурийск', '150.00'],
    ['№ 614933', '2020-04-03', 'Ким-Мельникова А.А.', 'Петрухи А.А.', 'Владивосток', 'Уссурийск', '150.00'],
    ['№ 614933', '2020-04-03', 'Ким-Мельникова А.А.', 'Петрухи А.А.', 'Владивосток', 'Уссурийск', '150.00'],
    ['№ 614933', '2020-04-03', 'Ким-Мельникова А.А.', 'Петрухи А.А.', 'Владивосток', 'Уссурийск', '150.00'],
    ['№ 614933', '2020-04-03', 'Ким-Мельникова А.А.', 'Петрухи А.А.', 'Владивосток', 'Уссурийск', '150.00'],
    ['№ 614933', '2020-04-03', 'Ким-Мельникова А.А.', 'Петрухи А.А.', 'Владивосток', 'Уссурийск', '150.00']
  ];

  constructor(public utils: UtilsService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      [FormControlName.DateStart]: new FormControl('', [Validators.required]),
      [FormControlName.DateEnd]: new FormControl('', [Validators.required]),
      [FormControlName.CityStart]: new FormControl('', [Validators.required]),
      [FormControlName.CityEnd]: new FormControl('', [Validators.required]),
    });
  }
}
