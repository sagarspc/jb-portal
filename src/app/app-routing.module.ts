import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddJobComponent } from './job/add-job/add-job.component';
import { ListJobsComponent } from './job/list-jobs/list-jobs.component';
import { UpdateJobComponent } from './job/update-job/update-job.component';
import { JobListComponent } from './seeker/job-list/job-list.component';
import { JobAppliedListComponent } from './seeker/job-applied-list/job-applied-list.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login/:type', component: LoginComponent },
  { path: 'register/:type', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent},
 { path: 'dashboard', component: DashboardComponent,canActivate : [AuthGuard] },

  { path: 'job-list', component: JobListComponent},
  { path: 'job-applied-list', component: JobAppliedListComponent},

  { path: 'jobs', component: ListJobsComponent,canActivate : [AuthGuard] },
  { path: 'jobs/add', component: AddJobComponent,canActivate : [AuthGuard]  },
  { path: 'jobs/:id', component: UpdateJobComponent,canActivate : [AuthGuard]  },

  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
