import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPersonComponent } from './components/add-person/add-person.component';
import { SignInComponent } from './components/sign-in/sign-in/sign-in.component';

const routes: Routes = [
  {path: "", component: SignInComponent},
  {path: "sign-in", component: SignInComponent},
  {path: "add-person", component: AddPersonComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
