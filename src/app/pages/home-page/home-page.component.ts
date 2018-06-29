import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { Observable, Subject} from 'rxjs';

import { RecipesActions, RecipesActionTypes, Get, Select } from '../../actions/recipes.actions';

import { CMSActions } from '../../services/dispatcher.service';
import { takeUntil } from 'rxjs/operators';



@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {
  results$: Observable<any>;
  loading$: Observable<any>;
  complete$: Observable<any>;
  selectedRecipe$: Observable<any>;
  private unsubscribe: Subject<void> = new Subject();
  recipeUri;

  constructor(
    private store: Store<fromRoot.State>,
    private actions$: CMSActions,
    private router: Router,
  ) {
    this.results$ = store.select(fromRoot.selectAllRecipes);
    this.complete$ = this.actions$.ofType(RecipesActionTypes.SELECT);
    // this.loading$ = store.select(fromRoot.resultsLoading);
    this.selectedRecipe$ = store.select(fromRoot.selectCurrentRecipe);
   }

  ngOnInit() {
    this.complete$
    .pipe(
      takeUntil(this.unsubscribe)
    )
    .subscribe(() => {
        this.router.navigate(['recipe-detail', this.recipeUri]);
    });

    this.selectedRecipe$.subscribe(data => {
      console.log(data);
    });
  }

  onSearch(query) {
    this.store.dispatch(new Get(query));
  }

  onSelect(uri) {
    this.recipeUri = uri;
    this.store.dispatch(new Select(uri));
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
}

}
