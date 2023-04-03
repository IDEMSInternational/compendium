import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntitiesComponent } from './components/entities/entities.component';
import { AuthComponent } from './components/auth/auth.component';

const routes: Routes = [
  {path: "", component: EntitiesComponent},
  {path: "sign-in", component: AuthComponent},
  {path: "entities", component: EntitiesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
