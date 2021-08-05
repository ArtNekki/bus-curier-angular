import FormControlName from '../maps/FormControlName';
import {FormControl} from '@angular/forms';

export default {
  [FormControlName.Fio]: {
    label: 'ФИО',
    type: 'text'
  },
  [FormControlName.FirstName]: {
    label: 'Имя',
    type: 'text'
  },
  [FormControlName.MiddleName]: {
    label: 'Отчество',
    type: 'text'
  },
  [FormControlName.LastName]: {
    label: 'Фамилия',
    type: 'text'
  },
  [FormControlName.Email]: {
    label: 'Email',
    type: 'email'
  },
  [FormControlName.Role]: {
    label: 'Роль',
    select: 'cities'
  },
  [FormControlName.Doc]: {
    label: 'Документ',
    select: 'cities'
  },
  [FormControlName.DocNumber]: {
    label: 'Серия и номер документа',
    type: 'text',
    mask: '0000 000000',
    prefix: ''
  },
  [FormControlName.Tel]: {
    label: 'Номер телефона',
    type: 'tel',
    mask: '(000) 000-0000',
    prefix: '+7'
  },
  [FormControlName.Street]: {
    label: 'Улица',
    type: 'text'
  },
  [FormControlName.Building]: {
    label: 'Дом, корус, строение',
    type: 'text'
  },
  [FormControlName.Apartment]: {
    label: 'Кв. / офис',
    type: 'text'
  },
  [FormControlName.Courier]: {
    label: 'Курьер',
    type: 'text'
  },
  [FormControlName.CourierTime]: {
    label: 'Удобное время для приезда курьера',
    type: 'text'
  },
  [FormControlName.CompanyName]: {
    label: 'Название компании',
    type: 'text'
  },
  [FormControlName.Address]: {
    label: 'Адрес',
    type: 'text'
  },
  [FormControlName.PlaceCount]: {
    label: 'Кол-во мест',
    type: 'text'
  },
  [FormControlName.Weight]: {
    label: 'Вес',
    type: 'text',
    unit: 'кг'
  },
  [FormControlName.Width]: {
    label: 'Ширина',
    type: 'text',
    unit: 'см'
  },
  [FormControlName.Height]: {
    label: 'Высота',
    type: 'text',
    unit: 'см'
  },
  [FormControlName.Length]: {
    label: 'Длина',
    type: 'text',
    unit: 'см'
  },
  [FormControlName.Date]: {
    label: 'Дата',
    type: 'text'
  },
  [FormControlName.DispatchData]: {
    label: 'Пункт отправления',
    type: 'text'
  },
  [FormControlName.Location]: {
    label: 'Населенный пункт',
    type: 'text'
  },
  [FormControlName.AddressPoints]: {
    label: 'Адреса',
    type: 'text'
  },
  [FormControlName.Department]: {
    label: 'Отделение',
    type: 'text'
  },
  [FormControlName.DepartmentTo]: {
    label: 'Передать в отделение',
    type: 'text'
  },
  [FormControlName.DepartmentFrom]: {
    label: 'Забрать из отделения',
    type: 'text'
  },
  [FormControlName.Docs]: {
    label: 'Документы',
    type: 'radio'
  },
  [FormControlName.Parcels]: {
    label: 'Посылки',
    type: 'radio'
  },
  [FormControlName.AutoParts]: {
    label: 'Автозапчасти',
    type: 'radio'
  },
  [FormControlName.Insurance]: {
    label: 'Cтрахование',
    type: 'radio'
  },
  [FormControlName.SmsForSender]: {
    label: 'СМС-уведомления отправителю',
    type: 'radio'
  },
  [FormControlName.SmsForRecipient]: {
    label: 'СМС-уведомления получателю',
    type: 'radio'
  },
  [FormControlName.CardboardBox]: {
    label: 'Коробка картонная',
    type: 'checkbox',
    meta: '50 руб. - 180 руб.'
  },
  [FormControlName.TransparentFilm]: {
    label: 'Пленка стрейч прозрачная',
    type: 'checkbox',
    meta: '30 руб. за 1 м.'
  },
  [FormControlName.SafePack]: {
    label: 'Сейф пакет',
    type: 'checkbox',
    meta: '10 руб.'
  },
  [FormControlName.BlackFilm]: {
    label: 'Пленка стрейч черная',
    type: 'checkbox',
    meta: '30 руб. за 1 м.'
  },
  [FormControlName.BagWithSeal]: {
    label: 'Мешок полипропиленовый с пломбой',
    type: 'checkbox',
    meta: '50 руб. - 180 руб.'
  },
  [FormControlName.Login]: {
    label: 'Логин',
    type: 'tel',
    placeholder: 'Номер телефона',
    mask: '(000) 000-0000',
    prefix: '+7'
  },
  [FormControlName.Password]: {
    label: 'Пароль',
    type: 'password'
  },
  [FormControlName.Remember]: {
    label: 'Запомнить',
    type: 'checkbox'
  },
  [FormControlName.Agree]: {
    label: (href: string) => `Нажимая кнопку «Отправить», я даю свое согласие на +
      '          <app-link [href]="${href}">обработку моих персональных данных</app-link>`,
    type: 'checkbox'
  },
  [FormControlName.CityStart]: {
    label: 'Город оправления',
    type: 'select'
  },
  [FormControlName.CityEnd]: {
    label: 'Город получения',
    type: 'select'
  },
  [FormControlName.Status]: {
    label: 'Селект',
    type: 'select'
  },
  [FormControlName.ProxyNumber]: {
    label: 'Номер доверенности',
    type: 'text'
  },
  [FormControlName.Inn]: {
    label: 'ИНН',
    type: 'text'
  },
  [FormControlName.Kpp]: {
    label: 'КПП',
    type: 'text'
  },
  [FormControlName.Ogrn]: {
    label: 'ОГРН',
    type: 'text'
  },
  [FormControlName.Rc]: {
    label: 'Р/с',
    type: 'text'
  },
  [FormControlName.Kc]: {
    label: 'К/c',
    type: 'text'
  },
  [FormControlName.DocNumber]: {
    label: 'Номер документа',
    type: 'text'
  },
  [FormControlName.DocDate]: {
    label: 'Дата договора',
    type: 'text'
  },
  [FormControlName.Carrier]: {
    label: 'Перевозчик',
    type: 'text'
  },
  [FormControlName.Leader]: {
    label: 'Руководитель',
    type: 'text'
  },
  [FormControlName.Bank]: {
    label: 'Банк',
    type: 'text'
  },
  [FormControlName.PassportNumber]: {
    label: 'Номер документа',
    type: 'text',
    mask: '0000 000000',
    prefix: ''
  },
  [FormControlName.PassportNumber]: {
    label: 'Номер документа',
    type: 'text',
    mask: '0000 000000',
    prefix: ''
  },
  [FormControlName.RusPassport]: {
    label: 'Номер документа',
    type: 'text',
    mask: '0000 000000',
    prefix: ''
  },
  [FormControlName.DriverLicense]: {
    label: 'Номер документа',
    type: 'text',
    mask: '00 00 000000',
    prefix: ''
  },
  [FormControlName.Question]: {
    label: 'Опишите ваш вопрос',
    type: 'textarea'
  },
};
