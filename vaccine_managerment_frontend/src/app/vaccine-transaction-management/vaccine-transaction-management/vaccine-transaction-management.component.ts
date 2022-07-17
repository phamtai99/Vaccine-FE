import {Component, OnInit} from '@angular/core';
import {IVaccinationTransaction} from "../../entity/IVaccinationTransaction";
import {VaccineTransactionService} from "../../service/vaccine-transaction.service"
import {IImportAndExport} from "../../entity/IImportAndExport";
import {ImportAndExportService} from "../../service/import-and-export.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-vaccine-transaction-management',
  templateUrl: './vaccine-transaction-management.component.html',
  styleUrls: ['./vaccine-transaction-management.component.scss']
})
export class VaccineTransactionManagementComponent implements OnInit {
  public vaccineTransaction: IVaccinationTransaction[]
  public exports: IImportAndExport[]
  vaccineTransactionId: number
  patientName: string
  page = 0
  pageable: any;
  keyword2 = '';
  keyword3 = '';
  listVaccineType: any;
  listTypeVaccine=[];
  p: any;
  config:any;


  constructor(
    public transactionService: VaccineTransactionService,
    public exportService: ImportAndExportService,
    public toastrService: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.getList()
  }

  /**
   * lấy list giao dịch
   */
  getList() {
    this.transactionService.getListTransaction(this.page).subscribe(data => {
      this.vaccineTransaction = data.content
      this.pageable = data
      this.config = {
        itemsPerPage: data.size,
        currentPage: this.page,
        totalItems: data.totalElements
      };
      console.log("danh sách giao dịch  vacccine ", data)
    }, error => console.log(error));

    this.exportService.getListExport(this.page).subscribe(data => {
      this.exports = data;
    }, error => console.log(error))
    this.exportService.getListVaccineType().subscribe(data => {
      this.listVaccineType = data;
      this.listVaccineType.forEach(element => {
        if(!this.listTypeVaccine.includes(element.name)){
          this.listTypeVaccine.push(element.name)
        }
      });
      console.log("danh sách loại vacccine ",  this.listTypeVaccine)
    }, error => console.log(error))
  }


  pageChanged(event){
    console.log(" event : ", event)
    this.config.currentPage = event;
    this.transactionService.getListTransaction(event-1).subscribe(data => {
      this.vaccineTransaction = data.content
      this.pageable = data
      this.config = {
        itemsPerPage: data.size,
        currentPage: event,
        totalItems: data.totalElements
      };
      console.log("danh sách giao dịch  vacccine ", data)
    }, error => console.log(error));
  }

  /**
   *tìm kiếm list giao dịch bằng tên bệnh nhân, loại vắc xin
   */
  search() {
    const searchCriteria = {
      keyword2: this.keyword2,
      keyword3: this.keyword3
    }
    this.transactionService.search(searchCriteria).subscribe(data => {
      console.log(data)
      this.vaccineTransaction = data.content;
      console.log(this.vaccineTransaction);
    }, error => console.log(error))
  }
  /**
   * lấy id , name cần xóa
   */
  getContentDelete(id, name) {
    this.vaccineTransactionId = id
    this.patientName = name
  }
  /**
   * xóa giao dịch bằng id
   */
  getMessageDelete(id: number) {
    this.transactionService.deleteById(id).subscribe(data => {
      this.ngOnInit()
      this.toastrService.success('Xóa thông tin giao dịch với bệnh nhân thành công!', 'Thông báo:');
    }, error => console.log(error))

  }
  /**
   * thông báo hủy
   */
  getMessageCancel() {
    this.toastrService.warning('Bạn đã chọn hủy và thông tin này không được xóa', 'Thông báo hủy.');
  }
}
