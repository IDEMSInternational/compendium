import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntitiesComponent } from './components/entities/entities.component';
import { AuthComponent } from './components/auth/auth.component';
import { EntityDetailComponent } from './components/entity-detail/entity-detail.component';
import { AuthGuardService } from './core/services/auth-guard/auth-guard.service';

const routes: Routes = [
  { path: "sign-in", component: AuthComponent },
  { path: "", component: EntitiesComponent, canActivate: [AuthGuardService] },
  { path: "entities", component: EntitiesComponent, canActivate: [AuthGuardService] },
  { path: "entity", component: EntityDetailComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
