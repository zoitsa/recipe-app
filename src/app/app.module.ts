import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { ApiService } from './services/api.service';
import { StoreModule, ActionsSubject } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { RecipesEffects } from './effects/recipes/recipes.effects';
import * as fromRecipes from './reducers/recipes.reducer';

import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatIconModule,
} from '@angular/material';

import {
  CMSActions,
  CMSActionsSubject,
} from './services/dispatcher.service';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RecipeDetailPageComponent } from './pages/recipe-detail-page/recipe-detail-page.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchInputComponent,
    SearchResultsComponent,
    HomePageComponent,
    RecipeDetailPageComponent,
    RecipeDetailComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([RecipesEffects]),
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    // StoreModule.forFeature('recipes', fromRecipes.reducer),
  ],
  providers: [
    ApiService,
    { provide: ActionsSubject, useClass: CMSActionsSubject },
    CMSActions,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
