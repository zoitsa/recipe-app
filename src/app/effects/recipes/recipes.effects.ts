import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { State } from '../../reducers';
import { of } from 'rxjs/Observable/of';
import {
  RecipesActions,
  RecipesActionTypes,
  Get,
  GetComplete,
  GetError,
  Select,
  SelectComplete,
  SelectError,
  } from '../../actions/recipes.actions';


import {
  tap,
  map,
  switchMap,
  skip,
  takeUntil,
  catchError,
  mergeMap,
  withLatestFrom,
} from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../../services/api.service';
import { resetFakeAsyncZone } from '@angular/core/testing';

export const errorHandler = (action) => (err) => {
  let message = err.error && err.error.message;
  if (!message) {
    message = 'Something went wrong, try again.';
  }
  return of(new action(message));
};


@Injectable()
export class RecipesEffects {

  constructor(
    private actions$: Actions,
    private api: ApiService,
    private store$: Store<State>,
  ) {}

  @Effect()
  getAll$: Observable<Action> = this.actions$.pipe(
    ofType<Get>(RecipesActionTypes.GET),
    switchMap((action) => {
      console.log(action);
      console.log(action.payload);
      return this.api.searchRecipes(action.payload)
        .pipe(
          map((res: object) => new GetComplete(res)),
          catchError(errorHandler(GetError))
        );
    }),
  );

  @Effect()
  getSelect$: Observable<Action> = this.actions$.pipe(
    ofType<Get>(RecipesActionTypes.SELECT),
    switchMap((action) => {
      console.log(action);
      console.log(action.payload);
      const encodedUri = encodeURI(action.payload);
      console.log(encodedUri);
      return this.api.selectRecipe(encodedUri)
        .pipe(
          map((res: object) => new SelectComplete(res)),
          catchError(errorHandler(SelectError))
        );
    }),
  );

} // end Recipes Effects
