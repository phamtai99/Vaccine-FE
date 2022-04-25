import {Component, OnInit} from '@angular/core';
import {VaccinationManagerService} from '../vaccination-manager.service';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DateSearchValidator} from '../commons/validatorDate.validator';
import {MessageManager} from "../commons/message-manager";

@Component({
  selector: 'app-periodical-vaccination-manager-list',
  templateUrl: './periodical-vaccination-manager-list.component.html',
  styleUrls: ['./periodical-vaccination-manager-list.component.scss']
})
export class PeriodicalVaccinationManagerListComponent implements OnInit {
  vaccinationId: number;
  locationName: string;
  vaccineTypeName: string;
  vaccineName: string;
  dateVaccination: string;
  public page = 0;
  config;any;

  p:any;

  formGroup: FormGroup;
  str = 'Ngày';
  public startDate = '';
  public endDate = '';
  public name = '';
  public status = '';
  listVaccination;

  constructor(private vaccinationManagerService: VaccinationManagerService,
              public formBuilder: FormBuilder,
              public messageManager: MessageManager) {
  }

  ngOnInit(): void {
    this.ngSubmit();
    this.searchDateAndNameOrStatus(0, 1);

  }




  ngSubmit() {
    this.formGroup = this.formBuilder.group({
      startDateInput: ['', [Validators.required]],
      endDateInput: ['', [Validators.required]],
      nameInput: ['', Validators.maxLength(10)],
      statusInput: [''],
    }, {validators: DateSearchValidator});
    this.searchVaccinationManager(0, 1);
  }

  /** Tìm kiếm và phân trang*/
  searchDateAndNameOrStatus(pageable, type) {

      this.searchVaccinationManager(pageable, type);

  }


  ResetsearchVaccinationManager(){
    this.startDate = '';
    this.name = '';
    this.status = '';
    this.ngOnInit();
  }

  /** Hiện danh sách tìm kiếm*/
  searchVaccinationManager(pageable, type) {

    this.vaccinationManagerService.searchDateAndNameOrStatus(this.startDate, this.name, this.status, pageable, type).subscribe(data => {
      if (data === null) {
        this.messageManager.showSearchWarning();
      
      } else {

        this.listVaccination = data;
        console.log("Danh sanh tim kiem : ",     this.listVaccination)
      }
    },error => console.log(error));
  }













  /** Xóa theo biến flag*/
  deleteVaccinationManager() {
    this.vaccinationManagerService.deleteVaccinationManager(this.vaccinationId).subscribe(data => {
      this.ngOnInit();
      this.messageManager.showMessageDelete();
    });
  }

  /** Cập nhật trạng thái*/
  updateVaccinationStatusManager() {
    this.vaccinationManagerService.updateVaccinationManagerStatus(this.vaccinationId).subscribe(data => {
      this.ngOnInit();
      this.messageManager.showMessageUpdateStatus();
    });
  }

  /** Hiện nội dung sau khi muốn xóa hay muốn câp nhập trạng thái*/
  getContentVaccination(id: number, date: string, location: string, vaccineType: string, vaccine: string) {
    this.vaccinationId = id;
    this.locationName = location;
    this.vaccineTypeName = vaccine;
    this.vaccineName = vaccineType;
    this.dateVaccination = date;
  }

  /** Cắt bớt tên vaccine*/
  getShortName(name: string, size: number): string {
    let nameStr = name;
    if (name.length > size) {
      return nameStr.substring(0, size).concat('...');
    } else {
      return name;
    }
  }

  /** Hiện Mã ID */
  getCode(id: number, size: number): string {
    let num = id.toString();
    while (num.length < size) {
      num = '0' + num;
    }
    return 'LTC-' + num;
  }

  /** Thông báo khi hủy xóa*/
  getMessageDelete() {
    this.messageManager.showMessageInfoDelete();
  }

  /** Thông báo khi hủy cập nhật*/
  getMessageUpdate() {
    this.messageManager.showMessageInfoUpdate();
  }
}
