import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IAccount} from "../entity/IAccount";
import {Observable} from "rxjs";
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseURL = environment.API_URL+'api/public/account';
  constructor(
    private http: HttpClient
  ) {
  }
  findAll(): Observable<IAccount[]>{
    return this.http.get<IAccount[]>(this.baseURL);
  }
}
