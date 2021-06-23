import formFieldMeta from './formFieldMeta';

export default {
  Sender: {
    fio: formFieldMeta.fio,
    doc: formFieldMeta.doc,
    'doc-number': formFieldMeta['doc-number'],
    'tel': formFieldMeta.tel
  },
  Department: {
    street: formFieldMeta.street,
    building: formFieldMeta.building,
    apartment: formFieldMeta.apartment
  },
  Courier: {
    street: formFieldMeta.street,
    building: formFieldMeta.building,
    apartment: formFieldMeta.apartment,
    ['courier-time']: formFieldMeta['courier-time']
  }
};
