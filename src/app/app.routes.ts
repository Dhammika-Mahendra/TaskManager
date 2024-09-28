import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { AdminDashboardComponent } from './modules/admin/components/admin-dashboard/admin-dashboard.component';
import { EmployeeDashboardComponent } from './modules/employee/components/employee-dashboard/employee-dashboard.component';

export const routes: Routes = [
    {path:'login', component: LoginComponent},
    {path:'signup', component: SignupComponent},
    {path:'admin',component:AdminDashboardComponent},
    {path:'employee',component:EmployeeDashboardComponent},
];
