import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IVaccine} from '../../entity/IVaccine';
import {ILocation} from '../../entity/ILocation';
import {VaccinationManagerService} from '../vaccination-manager.service';
import {Router} from '@angular/router';
import {DateValidator} from '../commons/validatorDate.validator';
import {ValidatorFormGroup} from '../commons/validatorTime.validator';
import {MessageManager} from "../commons/message-manager";

@Component({
  selector: 'app-periodical-vaccination-manager-create',
  templateUrl: './periodical-vaccination-manager-create.component.html',
  styleUrls: ['./periodical-vaccination-manager-create.component.scss']
})
export class PeriodicalVaccinationManagerCreateComponent implements OnInit {

  formGroup: FormGroup;
  vaccineList: IVaccine[] = [];
  vaccineLists: IVaccine[] = [];
  locationList: ILocation[] = [];
  valueTimes: number;
  valueDuration: number;

  valueAge: string;
  valueNameVaccine: string;
  check = false;
  messageError: string;
  valueOrigin:String;
  /** Thông báo validate*/
  statusString: string = 'Chưa thực hiện';
  currentDuration: string = 'Ngày';
  messageTime: string = 'Thời gian kết thúc phải sau thời gian bắt đầu!';

  validate_message = {
    'startTime': [
      {type: 'required', message: 'Thời gian bắt đầu không được để trống!'},
    ],
    'endTime': [
      {type: 'required', message: 'Thời gian kết thúc không được để trống!'},
    ],
    'date': [
      {type: 'required', message: 'Ngày tiêm chủng không được để trống!'},
      {type: 'dateValid', message: 'Ngày làm lịch tiêm chủng định kỳ không được trước ngày hiện tại!'}
    ],
    'vaccineId': [
      {type: 'required', message: 'Loại vắc-xin tiêm chủng không được để trống!'}
    ],
    'description': [
      {type: 'required', message: 'Ghi chú không được để trống!'},
      {type: 'maxlength', message: 'Không nhập ghi chú quá dài!'},
      {type: 'minlength', message: 'Không nhập ghi chú quá ngắn!'},
      {type: 'pattern', message: 'Trong ghi chú không kết thúc bằng dấu cách'},
    ]
  };

  constructor(public formBuilder: FormBuilder,
              public vaccinationManagerService: VaccinationManagerService,
              public router: Router,
              public messageManager: MessageManager) {
  }

  ngOnInit(): void {
    this.getAllLocation();
    this.getAllVaccine();
    this.formGroup = this.formBuilder.group({
      vaccinationId: [''],
      locationId:[''],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      date: ['', [Validators.required, DateValidator]],
      vaccineId: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
    }, {validators: ValidatorFormGroup});
  }

  /** Lấy danh sách địa điểm*/
  getAllLocation() {
    this.vaccinationManagerService.getAllLocation().subscribe((data: ILocation[]) => {
      this.locationList = data;
      console.log("danh sách địa điểm tiêm: ", this.locationList)
    }, error => console.log(error));
  };

  /** Lấy danh sách vaccine*/
  getAllVaccine() {
    this.vaccinationManagerService.getAllVaccine().subscribe((data: IVaccine[]) => {
      this.vaccineList = data;

      // console.log("danh sách tên vaccine: ",data)
      this.vaccineList.forEach(element => {
        if(!this.vaccineLists.includes(element)){
          this.vaccineLists.push(element);
        }

      });
      console.log("danh sách tên vaccine: ", this.vaccineList)
    }, error => console.log(error));
  };

  /** quay lại trang chủ*/
  submitForm() {
    if (this.formGroup.invalid){
      this.messageManager.showMessageCreateNotRole();
      return;
    } else {
      this.vaccinationManagerService.createVaccinationManager(this.formGroup.value).subscribe(data => {
        if (data !=null){
          this.messageError = data[0].defaultMessage;
          this.messageManager.showMessageCreateNotRole();
        } else {
          this.router.navigateByUrl('/periodical-vaccination-manager/list');
          this.messageManager.showMessageCreate();
        }
      });
    }
  }

  /**
   *  lấy dữ liệu của đối tượng khi có sự kiện
   * */
  getValue(vaccineId: any) {
    for (let i = 0; i < this.vaccineList.length; i++) {
      if (this.vaccineList[i].vaccineId == parseInt(vaccineId)) {
        this.valueAge = this.vaccineList[i].age;
        this.valueNameVaccine = this.vaccineList[i].vaccineType.name;
        this.valueTimes = this.vaccineList[i].times;
        this.valueDuration =this.vaccineList[i].duration;
        this.valueOrigin=this.vaccineList[i].origin;
      }
    }
  }
}
