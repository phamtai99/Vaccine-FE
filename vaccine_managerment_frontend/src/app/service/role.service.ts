import { Injectable } from '@angular/core';
import {IRole} from "../entity/IRole";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private baseURL = environment.API_URL+'/api/public/role';
  constructor(
    private http: HttpClient
  ) {
  }
  findAll(): Observable<IRole[]>{
    return this.http.get<IRole[]>(this.baseURL);
  }
}
