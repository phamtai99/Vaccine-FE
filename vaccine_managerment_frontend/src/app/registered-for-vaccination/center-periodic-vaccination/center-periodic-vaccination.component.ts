import { Component, OnInit } from '@angular/core';
import {IVaccinationHistory} from "../../entity/IVaccinationHistory";
import {VaccinationHistoryService} from "../../service/vaccination-history.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-center-periodic-vaccination',
  templateUrl: './center-periodic-vaccination.component.html',
  styleUrls: ['./center-periodic-vaccination.component.scss']
})

export class CenterPeriodicVaccinationComponent implements OnInit {

  public vaccinationHistoryList: IVaccinationHistory[];
  public name = '';
  public status = '';
  public page = 0;
  public pageable : any;
  public formGroup : FormGroup;
  p:any;

  config:any;





  constructor(private vaccinationHistoryService: VaccinationHistoryService ) { }

  // getListPeriodicVaccination(){
  //   this.vaccinationHistoryService.getListPeriodicVaccination(this.page).subscribe(data => {
  //     this.vaccinationHistoryList = data.content;
  //     this.pageable = data;
  //     this.config = {
  //       itemsPerPage: data.size,
  //       currentPage: this.page,
  //       totalItems: data.totalElements
  //     };
  //     console.log(" Danh sách bệnh nhân đăng kí tiêm chủng định kì trung tâm :",data);
  //   }, error =>
  //     this.vaccinationHistoryList = []
  //   );
  // }

  getListPeriodicVaccination(){
    this.vaccinationHistoryService.getAllListPeriodicVaccination().subscribe(data => {
      this.vaccinationHistoryList = data;
      console.log(" Danh sách bệnh nhân đăng kí tiêm chủng định kì trung tâm :",data);
    }, error =>
      this.vaccinationHistoryList = []
    );
  }


  pageChanged(event){
    console.log(" event : ", event)
    this.config.currentPage = event;
    this.vaccinationHistoryService.getListPeriodicVaccination(event-1).subscribe(data => {
      this.vaccinationHistoryList = data.content;
      this.pageable = data;
      this.config = {
        itemsPerPage: data.size,
        currentPage: event,
        totalItems: data.totalElements
      };
      console.log(" Danh sách bệnh nhân đăng kí tiêm chủng định kì trung tâm :",data);
    }, error =>
      this.vaccinationHistoryList = []
    );
  }


  // Tìm kiếm có phân trang
  // searchPeriodicVaccination(){
  //   this.vaccinationHistoryService.searchPeriodicVaccination(this.page,this.name,this.status).subscribe(data => {
  //     this.vaccinationHistoryList = data.content;
  //     this.pageable = data;
  //     console.log(data);
  //   }, error =>
  //   this.vaccinationHistoryList = []
  //   );
  // }

// Tìm kiếm ko phân trang
  searchPeriodicVaccination(){
    this.vaccinationHistoryService.searchPeriodicVaccinationRegister(this.name,this.status).subscribe(data => {
      this.vaccinationHistoryList = data;
      // this.pageable = data;
      console.log("Dữ liệu tìm kiếm :",data);
    }, error =>
    this.vaccinationHistoryList = []
    );
  }



  validation_messages = {
    name: [
      {type: 'pattern', message: 'Không được nhập ký tự đặt biệt hoặc số'}
    ]
  }
  ngOnInit(): void {
    this.getListPeriodicVaccination();
    this.formGroup = new FormGroup(
      {
        name: new FormControl('', [Validators.pattern('^[a-zA-Z\'-\'\\sáàảãạăâắằấầặẵẫậéèẻ ẽẹếềểễệóêòỏõọôốồổỗộ ơớờởỡợíìỉĩịđùúủũụưứ� �ửữựÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠ ƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼ� ��ỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞ ỠỢỤỨỪỬỮỰỲỴÝỶỸửữựỵ ỷỹ]*$'), Validators.maxLength(40)]),

      }
    )
  }


  resetSearch(){
    this.name='';
    this.status='';
    this.ngOnInit();
  }

}
