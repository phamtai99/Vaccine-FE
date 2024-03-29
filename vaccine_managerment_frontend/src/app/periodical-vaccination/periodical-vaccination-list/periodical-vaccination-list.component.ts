import { Component, OnInit } from '@angular/core';
import {PeriodicalVaccinationKhoaService} from "../../service/periodical-vaccination-khoa.service";
import {IPeriodicalVaccinationDTO} from "../../entity/IPeriodicalVaccinationDTO";
import {TokenStorageService} from "../../service/token-storage.service";

export class ISearchAndPage {
  vaccineName: string;
  startTime: string;
  endTime: string;
  date: string;
  age: string;
  description: string;
  currentPage: number;
  maxPage: number;


  constructor() {
    this.vaccineName = '';
    this.startTime = '';
    this.endTime = '';
    this.date = '';
    this.age = '';
    this.currentPage = 1;
    this.maxPage = 0;
    this.description = ''
  }
}

export interface TimeStamp {
  startTime: string;
  endTime: string;
}
@Component({
  selector: 'app-periodical-vaccination-list',
  templateUrl: './periodical-vaccination-list.component.html',
  styleUrls: ['./periodical-vaccination-list.component.scss']
})
export class PeriodicalVaccinationListComponent implements OnInit {

  searchData: ISearchAndPage = new ISearchAndPage();
  ageList: string[];
  time: string = "";
  timeListString: string[] = [];
  registrableVaccinationList: IPeriodicalVaccinationDTO[] ;
  selectedYear: string;
  selectedMonth: string;
  selectedDay: string;
  patient: object;
  p:any;

  lenghtListData:any;

  public page = 0;
  config:any;

  constructor(private vaccinationService : PeriodicalVaccinationKhoaService,
              public tokenStorageService: TokenStorageService) {
    this.getAgeList();
    this.getTimeList();
  }

  ngOnInit(): void {
    this.getPatient();
    this.searchPeriodicalVaccination();
  }
  pageChanged(event){
    console.log(" event : ", event)
    this.config.currentPage = event;
  }
  searchPeriodicalVaccination() {
    this.searchData.date='';
    if(this.selectedYear != null && this.selectedYear != '') {
      this.searchData.date += this.changeNumberFormat(this.selectedYear, 4)
    }
    if(this.selectedMonth != null && this.selectedMonth != '') {
      this.searchData.date += '-' + this.changeNumberFormat(this.selectedMonth, 2)
    }
    if(this.selectedDay != null && this.selectedDay != '') {
      this.searchData.date += '-' + this.changeNumberFormat(this.selectedDay,2)
    }
    console.log(" Tham số searchData: ",this.searchData);
    // this.vaccinationService.findTotalPage(this.searchData).subscribe((data: number) => {
    //   this.searchData.maxPage = data;
    // }, error => console.log(error));
    this.vaccinationService.findCustomVaccination(this.searchData).subscribe( (data: IPeriodicalVaccinationDTO[]) => {
      if(data!=null){
        this.registrableVaccinationList = data;
        // if(this.registrableVaccinationList.length>0){
        //   this.lenghtListData=true;
        // }else{
        //   this.lenghtListData=false;
        // }
        this.lenghtListData=true;
        
        console.log(" danh sách vaccine tiêm chủng định kỳ :",this.registrableVaccinationList)
      }else {
        this.lenghtListData=false;
        console.log(" danh sách vaccine :",data);
      }
     
    }, error => console.log(error))
  }

  getAgeList(): void {
    this.vaccinationService.getAgeList().subscribe( data => {
      this.ageList = data
    }, error => console.log(error))
  }

  getTimeList(): void {
    this.timeListString = [];
    this.vaccinationService.getTimeList().subscribe( data => {
      for ( let i = 0 ; i < data.length; i++) {
        this.timeListString.push(data[i].startTime + ' - ' + data[i].endTime)
      }
      console.log(this.timeListString);
    }, error => console.log(error))
  }

  search() {
    this.searchData.currentPage = 1;
    this.getAgeList();
    this.getTimeList();
    this.ngOnInit();
  }

  clearSearch() {
    this.searchData.vaccineName = '';
    this.searchData.startTime = '';
    this.searchData.endTime = '';
    this.searchData.date = '';
    this.searchData.age = '';
    this.searchData.currentPage = 1;
    this.searchData.maxPage = 0;
    this.time = '';
    this.selectedDay = '';
    this.selectedMonth = '';
    this.selectedYear = '';
    this.searchData.description = '';
    this.ngOnInit()
  }

  selectTime($event: any) {
    this.time = $event;
    this.searchData.startTime = this.time.substring(0,8);
    this.searchData.endTime = this.time.substring(11);
  }

  getPatient() {
    if (this.tokenStorageService.getToken()) {
      this.patient = this.tokenStorageService.getUser().patient;
    }
  }

  changeNumberFormat(num: string, formatNum: number): string {
    let outPut: string = '';
    for (let i = 0; i < formatNum - num.toString().length; i++ ) {
      outPut = '0' + outPut
    }
    outPut = outPut + num;
    return outPut;
  }
}
