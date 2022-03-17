import { element } from 'protractor';
import {Component, OnInit} from '@angular/core';
import {IImportAndExport} from '../../entity/IImportAndExport';
import {ImportAndExportService} from '../../service/import-and-export.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-vaccine-price-management',
  templateUrl: './vaccine-price-management.component.html',
  styleUrls: ['./vaccine-price-management.component.scss']
})
export class VaccinePriceManagementComponent implements OnInit {
  public exports: IImportAndExport[];
  public vaccineId: number
  keyword2 = '';
  keyword3 = '';
  vaccineType: any;
  origin: any;
  listOrigin=[];
  listVaccineType=[];
  page = 0;
  pageable: any;
  check = "disable";
  p: any;


  constructor(
    public exportService: ImportAndExportService,
    private toastrService: ToastrService

) {
  }

  ngOnInit(): void {
    this.getList()
  }

  getList() {
    this.exportService.getListExport(this.page).subscribe(data => {
      this.exports = data.content;
      this.pageable = data;
    });
    this.exportService.getListVaccineType().subscribe(data => {
      this.vaccineType = data
      console.log(" list vaccine type ",this.vaccineType);
      this.vaccineType.forEach(element => {
        if(!this.listVaccineType.includes(element.name)){
          this.listVaccineType.push(element.name)
        }

      });

      // console.log("Danh sánh loại vaccine  khác nhau: ",this.listVaccineType)

    })
    this.exportService.getListOrigin().subscribe(data => {
      console.log(" lấy danh sách nước sản xuất ",data);
      this.origin = data
      this.origin.forEach(element => {
        // console.log("Danh sánh  ",element.origin)
            if(!this.listOrigin.includes(element.origin)){
              this.listOrigin.push(element.origin);
            }

      });

      // console.log("Danh sánh nước sản xuất khác nhau: ",this.listOrigin)

    })
  }

  search() {
    const searchCriteria = {
      keyword2: this.keyword2,
      keyword3: this.keyword3,
    }
    this.exportService.search(searchCriteria).subscribe(data => {
      this.exports = data.content;
      console.log(this.exports);

    })
  }

}
