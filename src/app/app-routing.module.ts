import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeopleComponent } from './components/people/people.component';
import { SignInComponent } from './components/sign-in/sign-in/sign-in.component';

const routes: Routes = [
  {path: "", component: SignInComponent},
  {path: "sign-in", component: SignInComponent},
  {path: "people", component: PeopleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
