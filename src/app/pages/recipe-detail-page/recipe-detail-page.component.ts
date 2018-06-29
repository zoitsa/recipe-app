import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { Observable } from 'rxjs/Observable';

import { RecipesActions, RecipesActionTypes, Get, Select } from '../../actions/recipes.actions';


@Component({
  selector: 'app-recipe-detail-page',
  templateUrl: './recipe-detail-page.component.html',
  styleUrls: ['./recipe-detail-page.component.css']
})
export class RecipeDetailPageComponent implements OnInit {
  selectedRecipe$: Observable<any>;

  constructor(
    private store: Store<fromRoot.State>
  ) {
    this.selectedRecipe$ = store.select(fromRoot.selectCurrentRecipe);
   }

  ngOnInit() {
  }

}
