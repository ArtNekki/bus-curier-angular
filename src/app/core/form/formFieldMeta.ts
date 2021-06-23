import FormControlName from '../maps/FormControlName';

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
  [FormControlName.CourierTime]: {
    label: 'Удобное время для приезда курьера',
    type: 'text'
  }
};
