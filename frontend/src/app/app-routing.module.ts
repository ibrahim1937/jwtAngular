import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './common/guards/auth-guard.guard';
import { NotAuthGuard } from './common/guards/not-auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  // { path: 'heroes', component: HeroesComponent }
  { path: '', component: HomeComponent, canActivate: [AuthGuardGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
