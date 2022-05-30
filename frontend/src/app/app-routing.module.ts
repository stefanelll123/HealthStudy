import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { AuthStackGuard } from './features/auth/auth-stack.guard';
import { AuthGuard } from './features/auth/auth.guard';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { FeedbackComponent } from './features/feedback/feedback.component';
import { HomeComponent } from './features/home/home.component';
import { StudiesDetailsComponent } from './features/studies/studies-details/studies-details.component';
import { StudiesFormComponent } from './features/studies/studies-form/studies-form.component';
import { StudiesListComponent } from './features/studies/studies-list/studies-list.component';
import { StudiesComponent } from './features/studies/studies.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [AuthStackGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [AuthStackGuard]},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'studies',
        component: StudiesComponent,
        children: [
          {
            path: '',
            component: StudiesListComponent,
          },
          {
            path: 'new',
            component: StudiesFormComponent,
          },
          {
            path: ':studyId',
            component: StudiesDetailsComponent,
          }
        ]
      },
      {
        path: 'feedback',
        component: FeedbackComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
