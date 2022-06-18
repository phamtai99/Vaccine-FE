
import {Component, Inject, OnInit} from '@angular/core';

import {VaccineService} from "../vaccine.service";
import {ActivatedRoute,ParamMap, Route, Router} from '@angular/router';
import {AlertService} from "../alert.service";
import {IVaccineFindDTO} from "../../entity/IVaccineFindDTO";
import {UploadFileService} from "../../service/upload-file.service";
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from "rxjs/operators";
import {FormControl, FormGroup} from "@angular/forms";
import {FormBuilder, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-vaccine-edit',
  templateUrl: './vaccine-edit.component.html',
  styleUrls: ['./vaccine-edit.component.scss']
})
export class VaccineEditComponent implements OnInit {
  selectedImage: any = null;
  employeeId:any;
  vaccine :IVaccineFindDTO;
  formEditVaccine: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private vaccineService: VaccineService,
    private alertService: AlertService,
    private toastr: ToastrService) { }

  ngOnInit() {

    this.formEditVaccine = new FormGroup({
      vaccineId:  new FormControl(''),
      name: new FormControl('', [Validators.required,Validators.minLength(4)]),
      vaccineType: new FormControl('', [Validators.required,Validators.minLength(4)]),
      licenseCode: new FormControl('', [Validators.required, Validators.min(1)]),
      origin: new FormControl('', [Validators.required,
        Validators.minLength(1)]),
      dosage: new FormControl('', [Validators.required,Validators.min(0)]),
      price: new FormControl('', [Validators.required,
        Validators.min(0)]),
      expired: new FormControl('', [Validators.required]),
      maintenance: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required,
        Validators.min(0)]),

      times: new FormControl('', [Validators.required]),
      duration: new FormControl('', [Validators.required]),
      vaccineTypeId: new FormControl(''),
    });

    this.route.paramMap.subscribe((data :ParamMap) => {
      console.log("Thoong tin data : ",data);
      this.employeeId = data.get('id');
      this.vaccineService.findById(this.employeeId).subscribe(data => {
        this.vaccine = data;
        console.log("Thông tin chỉnh sửa vaccine  : ",this.vaccine);
        this.formEditVaccine.patchValue(data);

      });
    });

  }


  save() {
    this.vaccineService.editVaccine(this.formEditVaccine.value).subscribe(
      ()  => {
        
        console.log(" thông tin edit vaccine :",this.formEditVaccine.value);
      
        this.router.navigateByUrl('/vaccine-list').then(r => this.alertService.showMessage('Chỉnh sửa thành công!'));
      }, error => {
        this.alertService.showMessageErrors('Lỗi chỉnh sửa.'+error);
        console.log(error);
      }

    );
  }

}
