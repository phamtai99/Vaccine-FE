import { environment } from '../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {IVaccineDTO} from "../entity/IVaccineDTO";

import {ICreateDTO} from "../entity/ICreateDTO";
import { IVaccineFindDTO } from '../entity/IVaccineFindDTO';


@Injectable({
  providedIn: 'root'
})
export class VaccineService {
  private API = environment.API_URL+ 'api/public/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  getAllVaccine(index: number): Observable<IVaccineDTO[]> {
    return this.http.get<IVaccineDTO[]>(this.API + 'vaccines?index=' + index)
  }

  getAllVaccineNotPagination(): Observable<IVaccineDTO[]> {
    return this.http.get<IVaccineDTO[]>(this.API + 'vaccines-not-pagination')
  }

  search(nameVaccine: string, typeVaccine: string, originVaccine: string, statusVaccine: string): Observable<IVaccineDTO[]> {
    return this.http.get<IVaccineDTO[]>(this.API + 'search?nameVaccine=' + nameVaccine + '&typeVaccine=' + typeVaccine + '&originVaccine=' + originVaccine + '&statusVaccine=' + statusVaccine)
  }

  createVaccineDTO(vaccine: ICreateDTO): Observable<ICreateDTO> {
    return this.http.post<ICreateDTO>(this.API + 'vaccine-create/', JSON.stringify(vaccine), this.httpOptions)
  }

  findById(id): Observable<IVaccineFindDTO> {
    return this.http.get<IVaccineFindDTO>(this.API + 'findVaccineByid/'+ id, this.httpOptions);
  }


  editVaccine(vaccine): Observable<IVaccineFindDTO>{
    return this.http.put<IVaccineFindDTO>(this.API + 'edit-vaccine' , vaccine);
  }

}
