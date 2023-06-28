import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntitiesComponent } from './components/entities/entities.component';
import { AuthComponent } from './components/auth/auth.component';
import { EntityDetailComponent } from './components/entity-detail/entity-detail.component';

const routes: Routes = [
  {path: "", component: EntitiesComponent},
  {path: "sign-in", component: AuthComponent},
  {path: "entities", component: EntitiesComponent},
  {path: "entity", component: EntityDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
