import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegisteredForVaccinationRoutingModule} from "./registered-for-vaccination-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ViewRegisteredRequiredVaccinationComponent } from './view-registered-required-vaccination/view-registered-required-vaccination.component';
import {RegisteredRequiredVaccinationComponent} from "./registered-required-vaccination/registered-required-vaccination.component";
import {NgxPaginationModule} from 'ngx-pagination';
import {CenterPeriodicVaccinationComponent}  from './center-periodic-vaccination/center-periodic-vaccination.component';

@NgModule({
  imports: [
    CommonModule,
    RegisteredForVaccinationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxPaginationModule
  ],
  declarations: [ViewRegisteredRequiredVaccinationComponent,
                 RegisteredRequiredVaccinationComponent,
                 ]
})

export class RegisteredForVaccinationModule { }
