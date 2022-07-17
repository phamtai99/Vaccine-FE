import { NgModule } from '@angular/core';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { Routes, RouterModule } from '@angular/router';
import {EmployeeListComponent} from "./employee-list/employee-list.component";
import {EmployeeEditComponent} from "./employee-edit/employee-edit.component";
import {AuthGuard} from "../security/auth.guard";


const routes: Routes = [
  {path: 'employee', component: EmployeeListComponent,canActivate: [AuthGuard],
  data: {
  roles: ['ROLE_ADMIN','ROLE_YTA']
  }},

  {path: 'employee/edit-employee/:id', component: EmployeeEditComponent,canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN','ROLE_YTA']
    }},

  {path: 'employee/edit', component: EmployeeEditComponent,canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN','ROLE_YTA']
    }},
  {path: 'employee/create', component: EmployeeCreateComponent,canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN','ROLE_YTA']
    }}

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
