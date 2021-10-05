export interface CityFrom {
  id: string;
  name: string;
  site_id: string;
  office_id: string;
}

export interface CityTo {
  id: string;
  name: string;
  need_to_meet: string;
  zone_id: string;
  zone_name: string;
  office_id: string;
  district_id: string;
  district_name: string;
}

export interface CargoType {
  id: string;
  name: string;
  parent_id: string;
  use_dimensions: string;
}

export interface Office {
  id: string;
  name: string;
  address: string;
  phone: string;
  worktime: string;
  desc: string;
  office_id: string;
  site_id: string;
  get: string;
  give: string;
  delivery: string;
  pickup: string;
  geo_x: string;
  geo_y: string;
}

export interface Parcel {
  placeCount: number;
  weight: number;
  width: number;
  height: number;
  length: number;
}

export interface Service {
  id: string;
  name: string;
  site_name: string;
  price: string;
  property: string;
  group_id: string;
  subgroup_id: string;
}

export interface Address {
  street: string;
  building: string;
  apartment: string;
}

export interface CourierMode {
  pickup?: boolean;
  delivery?: boolean;
}

export interface ParcelLimits {
  name: string;
  maxWeight?: number;
  maxDimensionsSum?: number;
}





