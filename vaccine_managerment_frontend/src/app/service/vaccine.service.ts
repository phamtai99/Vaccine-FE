import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class VaccineService {

  private url = environment.API_URL+'api/public';

  private header: any;

  constructor(private http: HttpClient) {
    this.header = new Headers( {'Content-Type' : 'application/context'})
  }


  getListVaccine(page: number, name: string, vaccineTypeName: string, origin: string, status: string): Observable<any> {
    return this.http.get<any>(this.url + '/vaccine/list?page='+ page + '&name='+name + '&vaccineTypeName=' + vaccineTypeName + '&origin=' + origin + '&status=' + status );
  }

  getVaccineById(vaccineId: number): Observable<any> {
    return this.http.get<any>(this.url + '/vaccination/get-vaccine/' + vaccineId);
  }

  getAllVaccine(name: string): Observable<any> {
    return this.http.get<any>(this.url + '/get-list-vaccine?name='+name)
  }
}
