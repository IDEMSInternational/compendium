import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in/sign-in.component';
import { PeopleComponent } from './components/people/people.component';
import { TagsComponent } from './components/tags/tags.component';
import { EntitiesComponent } from './components/entities/entities.component';

const routes: Routes = [
  {path: "", component: EntitiesComponent},
  {path: "sign-in", component: SignInComponent},
  {path: "people", component: PeopleComponent},
  {path: "tags", component: TagsComponent},
  {path: "entities", component: EntitiesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
