import { Component, OnInit } from '@angular/core';
import { VaccineService } from 'src/app/service/vaccine.service';
import {IVaccine} from "../../entity/IVaccine";

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss']
})
export class SuggestionComponent implements OnInit {

  vaccineList: IVaccine[];
  name:string="";

  constructor(private vaccineService: VaccineService) { }

  ngOnInit(): void {
    this.getAllVaccine();
  }

  getAllVaccine() {
    this.vaccineService.getAllVaccine("").subscribe(data => {

      // console.log(data);
      this.vaccineList = data;
      console.log(" danh sach vaccine goi y :"+this.vaccineList);
    })
  }
}
