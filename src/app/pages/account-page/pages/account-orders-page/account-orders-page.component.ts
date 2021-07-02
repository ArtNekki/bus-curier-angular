import { Component, OnInit } from '@angular/core';
import {UtilsService} from '../../../../core/services/utils.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import formFieldMeta from '../../../../core/form/formFieldMeta';
import fieldError from '../../../../core/form/fieldError';
import FormControlName from 'src/app/core/maps/FormControlName';

@Component({
  selector: 'app-account-orders-page',
  templateUrl: './account-orders-page.component.html',
  styleUrls: ['./account-orders-page.component.scss']
})
export class AccountOrdersPageComponent implements OnInit {
  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;
  public FormFieldError = fieldError;

  public form: FormGroup;
  public status = [
    {value: '',  name: 'Выберите статус'},
    {value: '1', name: 'Подготовка к отправке'},
    {value: '2', name: 'Готов к выдаче'},
    {value: '3', name: 'Возврат'},
    {value: '4', name: 'Испорчено'}
  ];

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
      [FormControlName.Status]: new FormControl('', [Validators.required])
    });
  }
}
