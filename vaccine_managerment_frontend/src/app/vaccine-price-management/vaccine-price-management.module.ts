import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VaccinePriceRoutingModule} from './vaccine-price-routing.module';
import { VaccinePriceManagementComponent } from './vaccine-price-management/vaccine-price-management.component';
import { EditVaccinePriceComponent } from './edit-vaccine-price/edit-vaccine-price.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [VaccinePriceManagementComponent, EditVaccinePriceComponent],
  exports: [
    VaccinePriceManagementComponent
  ],
  imports: [
    CommonModule,
    VaccinePriceRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class VaccinePriceManagementModule { }
