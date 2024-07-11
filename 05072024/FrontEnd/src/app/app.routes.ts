import { Routes } from '@angular/router';
import { ProfiloComponent } from './components/profilo/profilo.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guard/AuthGuard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CorsiPageComponent } from './components/corsi-page/corsi-page.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "corsi", component: CorsiPageComponent },
  { path: "profilo", component: ProfiloComponent, canActivate: [AuthGuard] },
  { path: "modificaProfilo", component: UpdateProfileComponent, canActivate: [AuthGuard] },
];
