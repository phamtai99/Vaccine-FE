import {Component, OnInit} from '@angular/core';
import {PatientService} from "../../service/patient.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-list-patient',
  templateUrl: './list-patient.component.html',
  styleUrls: ['./list-patient.component.scss']
})
export class ListPatientComponent implements OnInit {
  deleteId: number;
  deleteName: string;
  listPatient;
  public patientId = '';
  public name = '';
  p:any;
  public page = 0;
  config:any;




  constructor(private patientService: PatientService, private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.searchPatient(0);
  }

  getListPeriodicPatient(pageable) {
    this.patientId = '';
    this.name = '';
    this.patientService.getAllPatient(pageable).subscribe(data => {
      this.listPatient = data;
      this.config = {
        itemsPerPage: data.size,
        currentPage: this.page,
        totalItems: data.totalElements
      };
      console.log("Data danh sách bệnh nhân :",data);
    }, error => console.log(error))
  }


  pageChanged(event){
    console.log(" event : ", event)
    this.config.currentPage = event;
    this.patientService.getAllPatient(event-1).subscribe(data => {
      this.listPatient = data;
      this.config = {
        itemsPerPage: data.size,
        currentPage: event,
        totalItems: data.totalElements
      };
      console.log("Data danh sách bệnh nhân :",data);
    }, error => console.log(error))
  }
  searchPatient(pageable) {
    this.patientId = this.patientId.replace('BN-', '');
    this.patientId = this.patientId.replace('BN', '');
    this.patientId = this.patientId.replace('B', '');
    this.patientId = this.patientId.replace('N-', '');
    this.patientId = this.patientId.replace('N', '');
    console.log(this.patientId);
    if (this.patientId === '' && this.name === '') {
      this.getListPeriodicPatient(pageable);
    }
    this.getSearch(pageable)
  }

  getSearch(pageable) {
    console.log("Danh sach ma benh nhan :", this.patientId);
    // this.patientId = this.patientId.replace('BN-0', '');
    this.patientService.getAllPatientByPatientIdAndName(this.patientId, this.name, pageable).subscribe(data => {
      if (data === null) {
        this.toastrService.warning("Thông tin bạn tìm kiếm hiện không có trong hệ thống ", 'Thông báo !')
        this.getListPeriodicPatient(0);
      } else {
        this.listPatient = data;
      }
    });
  }

  getCode(id: number, size: number): string {
    let num = id.toString();
    while (num.length < size) {
      num = '0' + num;
    }
    return 'BN-' + num;
  }

  deleteSuccess() {
    this.ngOnInit();
  }
}
