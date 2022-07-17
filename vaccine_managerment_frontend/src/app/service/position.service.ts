import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IPosition} from "../entity/IPosition";
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  private baseURL = environment.API_URL+'api/public/position';
  constructor(
    private http: HttpClient
  ) {
  }
  findAll(): Observable<IPosition[]>{
    return this.http.get<IPosition[]>(this.baseURL);
  }
}
