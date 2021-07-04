import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import UserType from '../../../../core/maps/UserType';
import {UtilsService} from '../../../../core/services/utils.service';

const EntityModType = {
  Active: 'active',
  EditAuth: 'editAuth',
  EditCompany: 'editCompany'
};

const IndividualModType = {
  Active: 'active',
  Edit: 'edit'
};

@Component({
  selector: 'app-account-personal-data-page',
  templateUrl: './account-personal-data-page.component.html',
  styleUrls: ['./account-personal-data-page.component.scss']
})
export class AccountPersonalDataPageComponent implements OnInit {
  public authEntity = [
    {name: 'Логин:', value: 'tafibuchgalter@mail.ru'}];

  public individual = [
    {name: 'ФИО:', value: 'Петров Иван Александрович'},
    {name: 'Email:', value: 'tafibuchgalter@mail.ru'},
    {name: 'Телефон:', value: '+7 (900) 434 34 54'},
    {name: 'Паспортные данные:', value: '8013 902456'}
  ];

  public organization = [
    {name: 'Наименование:', value: 'Тафи-диагностика МЛ, ООО'},
    {name: 'Руководитель:', value: 'Думнов Эдуард'},
    {name: 'Телефон:', value: '+79046296359'},
    {name: 'ИНН:', value: '2536242157'},
    {name: 'КПП:', value: '253601001'},
    {name: 'ОГРН:', value: '1112536006593'},
    {name: 'Банк:', value: 'ПАО АКБ Приморье'},
    {name: 'Р/с:', value: '40702810100142923801'},
    {name: 'К/с:', value: '30101810800000000795'},
    {name: '№ договора:', value: '30'},
    {name: 'Дата договора:', value: '30 01.08.2013'},
    {name: 'Перевозчик:', value: '21'}
  ];

  public entityMod = {
    [EntityModType.Active]: false,
    [EntityModType.EditAuth]: false,
    [EntityModType.EditCompany]: false
  };

  public individualMod = {
    [IndividualModType.Active]: false,
    [IndividualModType.Edit]: false
  };

  public currentQueryParams;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public utils: UtilsService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.currentQueryParams = this.utils.copyObject(params);

      if (params[UserType.Entity]) {
        this.entityMod[EntityModType.Active] = true;

        if (params[EntityModType.EditAuth]) {
          this.entityMod[EntityModType.EditAuth] = true;
          this.entityMod[EntityModType.EditCompany] = false;
        } else if (params[EntityModType.EditCompany]) {
          this.entityMod[EntityModType.EditCompany] = true;
          this.entityMod[EntityModType.EditAuth] = false;
        } else {
          this.entityMod[EntityModType.EditCompany] = false;
          this.entityMod[EntityModType.EditAuth] = false;
        }

      } else if (params[UserType.Individual]) {
        this.individualMod[IndividualModType.Active] = true;

        if (params[IndividualModType.Edit]) {
          this.individualMod[IndividualModType.Edit] = true;
        } else {
          this.individualMod[IndividualModType.Edit] = false;
        }
      }
    });

    this.loadUserTypeData();
  }

  loadUserTypeData() {
    const url = this.utils.formatUrl(this.router.url);

    this.router.navigate(url, {
      queryParams: {
        [UserType.Entity]: true
      }
    });
  }

  editCompany() {
    this.activateEditMode(EntityModType.EditCompany);
  }

  editEntityAuth(e: MouseEvent) {
    e.preventDefault();
    this.activateEditMode(EntityModType.EditAuth);
  }

  activateEditMode(modType) {
    const queryParams = Object.assign(this.currentQueryParams, {
      [modType]: 'true'
    });

    switch (modType) {
      case EntityModType.EditCompany:
        delete queryParams[EntityModType.EditAuth];
        break;
      case EntityModType.EditAuth:
        delete queryParams[EntityModType.EditCompany];
        break;
    }

    const url = this.utils.formatUrl(this.router.url);

    this.router.navigate(url, {
      queryParams
    });
  }

  editIndividual(e: MouseEvent) {
    e.preventDefault();
    this.activateEditMode(IndividualModType.Edit);
  }
}
