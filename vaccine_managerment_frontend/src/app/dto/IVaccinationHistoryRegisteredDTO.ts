/**
 * VaccinationHistoryRegistered : create by LongBP
 */

export interface IVaccinationHistoryRegisteredDTO {

  vaccinationHistoryId : number;

  patientId : number;

  patientName : string;

  patientDob : string;

  patientGender : boolean;

  patientGuardian : string;

  patientPhone : string;

  patientAddress : string;

  vaccineName : string;

  vaccineTypeName : string;

  vaccinationHistoryStatus : boolean;

  endTime : string;
  startTime:string;

  dosage : string;

  preStatus : string;

  afterStatus : string;
  expired: string;

  vaccinationTimes : number;

}
