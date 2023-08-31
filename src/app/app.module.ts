import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { EntitiesComponent } from './components/entities/entities.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AuthComponent } from './components/auth/auth.component';
import { EntityComponent } from './components/entity/entity.component';
import { TagsComponent } from './components/tags/tags.component';
import { TagComponent } from './components/tag/tag.component';
import { EntityDetailComponent } from './components/entity-detail/entity-detail.component';
import { DynamicFormModule } from './shared/dynamic-form/dynamic-form.module';

@NgModule({
  declarations: [
    AppComponent,
    EntitiesComponent,
    AuthComponent,
    EntityComponent,
    TagsComponent,
    TagComponent,
    EntityDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatSelectModule,
    DynamicFormModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
