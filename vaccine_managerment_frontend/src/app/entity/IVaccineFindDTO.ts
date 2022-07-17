import { IVaccineType } from "./IVaccineType";

export interface IVaccineFindDTO {
  vaccineId: number;
  name: string;
  licenseCode: string;
  origin: string;
  age: string;
  maintenance: string;
  dosage: number;
  deleteFlag: boolean;
  expired:String;
  quantity:number,
  vaccineType: IVaccineType;
  times: number;
  duration: number;
}
