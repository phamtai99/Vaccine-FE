import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {VaccineListComponent} from "./vaccine-list/vaccine-list.component";
import {VaccineCreateComponent} from "./vaccine-create/vaccine-create.component";
import {VaccineEditComponent} from "./vaccine-edit/vaccine-edit.component";
import {ImportAndExportModule} from "../import-and-export/import-and-export.module";
import {AuthGuard} from "../security/auth.guard";


const routes:Routes=[
  {path:'vaccine-list',component: VaccineListComponent,canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN','ROLE_YTA']
    }},
  {path:'vaccine-create',component: VaccineCreateComponent,canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN','ROLE_YTA']
    }},

    {
      path:'vaccine-edit/:id',
      component: VaccineEditComponent,
      canActivate: [AuthGuard],
      data: {
        roles: ['ROLE_ADMIN','ROLE_YTA']
      }
    },
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ImportAndExportModule
  ]
})
export class VaccineRoutingModule { }
