import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {EmployeeDto} from "../dto/EmployeeDto";
import {catchError} from "rxjs/operators";
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private API_EMPLOYEE= environment.API_URL+'api/public';
  constructor(private httpClient: HttpClient) {
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  };


  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

  /**
   * @param employeeDto
   */
  createEmployee(employeeDto): Observable<EmployeeDto> {
    return this.httpClient.post<EmployeeDto>(this.API_EMPLOYEE + '/create', JSON.stringify(employeeDto), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getListPositionAndRole(){
    return this.httpClient.get<any>(this.API_EMPLOYEE + '/create');
  }
}
