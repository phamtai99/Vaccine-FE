

import { Component, OnInit } from '@angular/core';
import {IVaccinationHistory} from "../../entity/IVaccinationHistory";
import {VaccinationHistoryService} from "../../service/vaccination-history.service";

@Component({
  selector: 'app-registered-required-vaccination',
  templateUrl: './registered-required-vaccination.component.html',
  styleUrls: ['./registered-required-vaccination.component.scss']
})
export class RegisteredRequiredVaccinationComponent implements OnInit {

  public vaccinationHistoryList: IVaccinationHistory[];
  public name = '';
  public status = '';
  public page = 0;
  public pageable : any;
  p:any;
  config;any;



  constructor(private vaccinationHistoryService: VaccinationHistoryService ) { }

  ngOnInit(): void {
    this.getAll();
  }

  // getAll(){
  //   this.vaccinationHistoryService.getAllRegisteredRequired(this.page,2,this.name,).subscribe(data => {
  //     this.vaccinationHistoryList = data.content;
  //     this.pageable = data;
  //     this.config = {
  //       itemsPerPage: data.size,
  //       currentPage: this.page,
  //       totalItems: data.totalElements
  //     };
  //     console.log(" Danh sánh bệnh nhân đăng kí tiêm chủng theo yêu cầu : ",data);
  //   }, error => console.log(error));
  // }

  getAll(){
    this.vaccinationHistoryService.getAllRegisteredRequired().subscribe(data => {
      this.vaccinationHistoryList = data;

      console.log(" Danh sánh bệnh nhân đăng kí tiêm chủng theo yêu cầu : ",data);
    }, error => console.log(error));
  }


  // pageChanged(event){
  //   console.log(" event : ", event)
  //   this.config.currentPage = event;
  //   this.vaccinationHistoryService.getAllRegisteredRequired(event-1,2,this.name,).subscribe(data => {
  //     this.vaccinationHistoryList = data.content;
  //     this.pageable = data;
  //     this.config = {
  //       itemsPerPage: data.size,
  //       currentPage: event,
  //       totalItems: data.totalElements
  //     };
  //     console.log(" Danh sánh bệnh nhân đăng kí tiêm chủng theo yêu cầu : ",data);
  //   }, error => console.log(error));
  // }



  // search(){
  //   this.vaccinationHistoryService.searchRegisteredRequired(this.page,2,this.name,this.status).subscribe(data => {
  //     this.vaccinationHistoryList = data.content;
  //     this.pageable = data;
  //     console.log(data);
  //   }, error => {
  //     console.log(error);
  //     this.vaccinationHistoryList = [];
  //   });
  // }

  search(){
    console.log('Tham số gửi đi '+this.name  +'----'+this.status);
    this.vaccinationHistoryService.searchRegisteredRequired(this.name,this.status).subscribe(data => {
      this.vaccinationHistoryList = data;

      console.log(data);
    }, error => {
      console.log(error);
      this.vaccinationHistoryList = [];
    });
  }

  resetSearch(){
    this.name='';
    this.status='';
    this.ngOnInit();
  }

}



