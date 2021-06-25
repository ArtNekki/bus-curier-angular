import formFieldMeta from './formFieldMeta';
import FormControlName from '../maps/FormControlName';

export default {
  Sender: {
    [FormControlName.Fio]: formFieldMeta.fio,
    [FormControlName.Doc]: formFieldMeta.doc,
    [FormControlName.DocNumber]: formFieldMeta[FormControlName.DocNumber],
    [FormControlName.Tel]: formFieldMeta.tel
  },
  Department: {
    [FormControlName.Street]: formFieldMeta.street,
    [FormControlName.Building]: formFieldMeta.building,
    [FormControlName.Apartment]: formFieldMeta.apartment
  },
  Courier: {
    [FormControlName.Street]: formFieldMeta.street,
    [FormControlName.Building]: formFieldMeta.building,
    [FormControlName.Apartment]: formFieldMeta.apartment,
    [FormControlName.CourierTime]: formFieldMeta[FormControlName.CourierTime]
  },
  Individual: {
    [FormControlName.LastName]: formFieldMeta[FormControlName.LastName],
    [FormControlName.FirstName]: formFieldMeta[FormControlName.FirstName],
    [FormControlName.MiddleName]: formFieldMeta[FormControlName.MiddleName],
    [FormControlName.Email]: formFieldMeta.email,
    [FormControlName.Tel]: formFieldMeta.tel,
    [FormControlName.Role]: formFieldMeta.role
  },
  Entity: {
    [FormControlName.CompanyName]: formFieldMeta[FormControlName.CompanyName],
    [FormControlName.Address]: formFieldMeta.address,
    [FormControlName.Tel]: formFieldMeta.tel
  },
  Parcel: {
    [FormControlName.PlaceCount]: formFieldMeta[FormControlName.PlaceCount],
    [FormControlName.Weight]: formFieldMeta[FormControlName.Weight],
    [FormControlName.Width]: formFieldMeta[FormControlName.Width],
    [FormControlName.Height]: formFieldMeta[FormControlName.Height],
    [FormControlName.Length]: formFieldMeta[FormControlName.Length]
  }
};
