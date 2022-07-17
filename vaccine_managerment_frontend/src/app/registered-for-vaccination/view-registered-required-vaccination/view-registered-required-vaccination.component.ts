
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Component, OnInit } from '@angular/core';
import {IVaccinationHistoryRegisteredDTO} from "../../dto/IVaccinationHistoryRegisteredDTO";
import {VaccinationHistoryService} from "../../service/vaccination-history.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {AlertService} from "../../employee/alert.service";

@Component({
  selector: 'app-view-registered-required-vaccination',
  templateUrl: './view-registered-required-vaccination.component.html',
  styleUrls: ['./view-registered-required-vaccination.component.scss']
})
export class ViewRegisteredRequiredVaccinationComponent implements OnInit {

  public infoPatient: IVaccinationHistoryRegisteredDTO[];
  public preStatus = '';
  public status = true;
  formGroup: FormGroup;

  public vaccinationHistoryRegisteredDTOS: IVaccinationHistoryRegisteredDTO;

  constructor(private vaccinationHistoryService : VaccinationHistoryService,
              private router: Router,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      afterStatus: ['', [Validators.required, Validators.maxLength(140),
        Validators.pattern('^[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ,;-]+(\\s[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ,;-]+)*$'),

      ]]
    });
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.vaccinationHistoryService.getByIdRegisteredRequired(paramMap.get('id')).subscribe((data: IVaccinationHistoryRegisteredDTO[]) => {
        this.infoPatient = data;
        console.log("Chi tiết: ",data);
        for (let e of data) {
          if (e.vaccinationHistoryId == Number(paramMap.get('idHistory'))) {
            this.vaccinationHistoryRegisteredDTOS = e;
          }
        }
      });
    });
  }

  editVaccinationHistory(){

    console.log("Dữ liệu form gửi đi  :", this.formGroup.value.afterStatus);
    this.vaccinationHistoryService.editVaccinationHistory(this.formGroup.value.afterStatus,this.vaccinationHistoryRegisteredDTOS.vaccinationHistoryId).subscribe(data => {
      this.vaccinationHistoryRegisteredDTOS = data;
      console.log(data);
      this.router.navigateByUrl('/registered-required-vaccination').then(r => this.alertService.showAlertSuccess('Xác nhận sẽ tiêm cho bệnh nhân thành công!'));
    }, error => {
      console.log(error);
    });
  }
}
