import {Component, OnInit} from '@angular/core';
import {VaccineService} from "../vaccine.service";
import {IVaccineDTO} from "../../entity/IVaccineDTO";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-vaccine-list',
  templateUrl: './vaccine-list.component.html',
  styleUrls: ['./vaccine-list.component.scss']
})

export class VaccineListComponent implements OnInit {
  indexPagination: number = 1;
  totalPagination: number;
  public searchVaccine: FormGroup;
  vaccines: IVaccineDTO[] = [];
  listVaccineNotPagination: IVaccineDTO[] = [];
  p: any ;

  constructor(private vaccineService: VaccineService) {
  }

  ngOnInit(): void {
    this.vaccineService.getAllVaccineNotPagination().subscribe((data: IVaccineDTO[]) => {
      console.log(data);
      this.vaccines = data;

    });

    this.searchVaccine = new FormGroup({
      nameVaccine: new FormControl(''),
      typeVaccine: new FormControl(''),
      originVaccine: new FormControl(''),
      statusVaccine: new FormControl('')
    });

  
  }

  search() {
    this.vaccineService.search(this.searchVaccine.value.nameVaccine, this.searchVaccine.value.typeVaccine, this.searchVaccine.value.originVaccine,
      this.searchVaccine.value.statusVaccine).subscribe((data: IVaccineDTO[]) => {
      return this.vaccines = data
    });
  }

}
