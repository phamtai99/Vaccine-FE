import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ImportAndExportService {
  public API = environment.API_URL+'api/public/';
  API_SEARCH = environment.API_URL+'api/public/vaccine-price-search';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  constructor(
    public http: HttpClient
  ) {
  }

  getListExport(page: number): Observable<any> {
    return this.http.post<any>(this.API + 'vaccine-price-list?page=' + page, this.httpOptions);
  }

  editPrice(id: number, price: number): Observable<any> {
    return this.http.put(this.API + 'vaccine-price-edit/' + id + '/' + price, this.httpOptions);
  }

  getExportId(id): Observable<any> {
    return this.http.get(this.API + 'getExportId/' + id)
  }

  search(search): Observable<any> {
    return this.http.post(this.API_SEARCH, search);
  }
  getListVaccineType(): Observable<any>{
    return this.http.get(this.API + "getVaccineType")
  }
  getListOrigin(): Observable<any>{
    return this.http.get(this.API + "getOriginVaccine")
  }
  /**

   * @param id
   * @param input
   */
  exportVaccine(id, input): Observable<any>{
    let params = new HttpParams();
    params = params.append('input', input);
    return this.http.get(this.API + id + '/exportVaccine' , {params})
  }

  /**

   * @param idVaccine
   */
  findVaccineById(idVaccine :number):Observable<any>{
    return this.http.get(this.API + 'getVaccine/' + idVaccine)
  }
}
