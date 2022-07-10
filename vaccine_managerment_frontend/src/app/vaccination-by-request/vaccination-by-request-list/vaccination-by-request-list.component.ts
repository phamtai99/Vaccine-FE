import { Component, OnInit } from '@angular/core';
// import {VaccineService} from "../../service/vaccine.service";

import {IVaccine} from "../../entity/IVaccine";
import {ShowMessage} from "../../common/show-message";
// import {VaccineService} from "../vaccine.service";
import {IVaccineDTO} from "../../entity/IVaccineDTO";
import {FormControl, FormGroup} from "@angular/forms";
import {VaccineService} from "../../vaccine/vaccine.service";

@Component({
  selector: 'app-vaccination-by-request-list',
  templateUrl: './vaccination-by-request-list.component.html',
  styleUrls: ['./vaccination-by-request-list.component.scss']
})
export class VaccinationByRequestListComponent implements OnInit {

  // public vaccineList: IVaccine[];

  // public name = '';
  // public vaccineTypename = '';
  // public origin = '';
  // public page = 0;
  // public pageable: any;
  // public status = "";
  // p:any;
  // config: any;

  // constructor(private vaccineService: VaccineService,
  //             private showMessage: ShowMessage
  //            ) {

  //             }


  // ngOnInit(): void {


  //   this.getListVaccine();
  // }
  // pageChanged(event){
  //   console.log(" event : ", event)
  //   this.config.currentPage = event;
  //   this.vaccineService.getListVaccine(event-1,this.name.trim(),this.vaccineTypename.trim(),this.origin.trim(), this.status).subscribe(data => {
  //     console.log(data.length);
  //     this.vaccineList = data.content;
  //     this.pageable = data;

  //     this.config = {
  //                 itemsPerPage: data.size,
  //                 currentPage: event,
  //                 totalItems: data.totalElements
  //               };
  //     console.log(  "data phân trang :",this.vaccineList);
  //   }, error => {
  //     this.showMessage.showMessageNotFound();
  //     this.vaccineList = [];
  //   });

  // }
  // getListVaccine() {
  //   console.log(  "check phân trang :",Number(this.page));
  //   if (!Number(this.page) || Number(this.page) < 0) {
  //     this.page = 0;
  //   }

  //   this.vaccineService.getListVaccine(this.page,this.name.trim(),this.vaccineTypename.trim(),this.origin.trim(), this.status).subscribe(data => {
  //     console.log(data.length);
  //     this.vaccineList = data.content;
  //     this.pageable = data;

  //     this.config = {
  //                 itemsPerPage: data.size,
  //                 currentPage: this.page,
  //                 totalItems: data.totalElements
  //               };
  //     console.log(  "data phân trang :",data);
  //   }, error => {
  //     this.showMessage.showMessageNotFound();
  //     this.vaccineList = [];
  //   });
  // }

  // resetSearch() {
  //   this.name = '';
  //   this.page = 0;
  //   this.vaccineTypename = '';
  //   this.origin = '';
  //   this.status = '';
  //   this.getListVaccine();
  // }





  indexPagination: number = 1;
  totalPagination: number;
  public searchVaccine: FormGroup;
  vaccines: IVaccineDTO[] = [];
  listVaccineNotPagination: IVaccineDTO[] = [];
  p: any ;

  listDataVac:any;

  constructor(private vaccineService: VaccineService) {
  }

  ngOnInit(): void {

    this.vaccineService.getAllVaccineNotPagination().subscribe((data: IVaccineDTO[]) => {
      console.log(data);
      if(data!=null){
        this.vaccines = data;
        this.listDataVac=true;
       }else {
        this.listDataVac=false;
       }

    }, error => console.log(error));

    this.searchVaccine = new FormGroup({
      nameVaccine: new FormControl(''),
      typeVaccine: new FormControl(''),
      originVaccine: new FormControl(''),
      statusVaccine: new FormControl('')
    });


  }

  search() {
    console.log(' tham số search : ',this.searchVaccine.value);
    this.vaccineService.search(this.searchVaccine.value.nameVaccine, this.searchVaccine.value.typeVaccine, this.searchVaccine.value.originVaccine,
      this.searchVaccine.value.statusVaccine).subscribe((data: IVaccineDTO[]) => {
      if(data!=null){
        this.vaccines = data;
        this.listDataVac=true;
       }else {
        this.listDataVac=false;
       }
    }, error => console.log(error));
  }


  resetSearch(){
    this.searchVaccine.value.nameVaccine='';
    this.searchVaccine.value.typeVaccine='';
    this.searchVaccine.value.originVaccine='';
    this.searchVaccine.value.statusVaccine='';
    this.ngOnInit();
  }

}
