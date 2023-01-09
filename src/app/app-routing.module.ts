import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in/sign-in.component';
import { PeopleComponent } from './components/people/people.component';
import { TagsComponent } from './components/tags/tags.component';

const routes: Routes = [
  {path: "", component: SignInComponent},
  {path: "sign-in", component: SignInComponent},
  {path: "people", component: PeopleComponent},
  {path: "tags", component: TagsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
