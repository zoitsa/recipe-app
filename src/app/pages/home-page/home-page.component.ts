import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { Observable } from 'rxjs/Observable';

import { RecipesActions, RecipesActionTypes, Get, Select } from '../../actions/recipes.actions';



@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  results$;
  loading$;

  constructor(
    private store: Store<fromRoot.State>
  ) {
    this.results$ = store.select(fromRoot.selectRecipesResults);
    this.loading$ = store.select(fromRoot.resultsLoading);
   }

  ngOnInit() {
  }

  onSearch(query) {
    this.store.dispatch(new Get(query));
  }

  onSelect(uri) {
    this.store.dispatch(new Select(uri));
  }

}
