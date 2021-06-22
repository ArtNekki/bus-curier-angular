export default {
  fio: {
    label: 'ФИО',
    type: 'text'
  },
  doc: {
    label: 'Документ',
    select: 'cities'
  },
  'doc-number': {
    label: 'Серия и номер документа',
    type: 'text',
    mask: '0000 000000',
    prefix: ''
  },
  'tel': {
    label: 'Номер телефона',
    type: 'tel',
    mask: '(000) 000-0000',
    prefix: '+7'
  }
};
