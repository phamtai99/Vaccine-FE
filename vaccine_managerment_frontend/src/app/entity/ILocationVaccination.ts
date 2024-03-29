import {ILocation} from './ILocation';
import {IVaccine} from './IVaccine';
import {IVaccinationHistory} from './IVaccinationHistory';
import {IVaccinationType} from './IVaccinationType';

export interface ILocationVaccination {
  vaccinationId: number;
  startTime: string;
  endTime: string;
  date: string;
  status: boolean;
  description: string;
  deleteFlag: boolean;
  // times: number;
  // duration: number;
  locationId: number;
  vaccine: IVaccine;
  vaccinationHistoryList: IVaccinationHistory[];
  vaccinationType: IVaccinationType;
  location: ILocation;
}
