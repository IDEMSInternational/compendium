import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DynamicFormFieldComponent } from './components/dynamic-form-field/dynamic-form-field.component';
import { ReactiveFormsModule } from '@angular/forms';


const components = [DynamicFormComponent, DynamicFormFieldComponent]

@NgModule({
  declarations: components,
  imports: [
    CommonModule, ReactiveFormsModule 
  ],
  exports: components
})
export class DynamicFormModule { }
