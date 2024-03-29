import { NgModule } from '@angular/core';
import {VaccineListComponent} from "./vaccine-list/vaccine-list.component";
import {VaccineEditComponent} from "./vaccine-edit/vaccine-edit.component";

import {VaccineCreateComponent} from "./vaccine-create/vaccine-create.component";
import {VaccineRoutingModule} from "./vaccine-routing.module";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {NgxPaginationModule} from 'ngx-pagination';



@NgModule({
  declarations: [VaccineListComponent, VaccineCreateComponent,VaccineEditComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    HttpClientModule,
    VaccineRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule
  ]
})
export class VaccineModule { }
