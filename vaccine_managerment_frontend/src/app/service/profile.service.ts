import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private url =environment.API_URL+ 'api/public';

  constructor(private http: HttpClient) { }



  getAllPatientByEmai(email: string):Observable<any> {
    return this.http.get<any>(this.url + '/profile?email=' + email);
  }


  /**
   * Phuoc
   **/
  getListVaccinationHistoryByPatient(page: number, name: string, date: string, patientId: string):Observable<any> {
    return this.http.get<any>(this.url + '/profile-personal?name='+ name + '&date=' + date + '&patientId=' + patientId +'&page=' + page);
  }
}
