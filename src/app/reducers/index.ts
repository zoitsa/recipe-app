import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromRecipes from './recipes.reducer';

export interface State {
  recipes: fromRecipes.State;
}

export const reducers: ActionReducerMap<State> = {
  recipes: fromRecipes.reducer,
};

export const selectRecipesState = (state: State) => state.recipes;

export const selectRecipesResults = createSelector(
  selectRecipesState,
  fromRecipes.results
);

export const resultsLoading = createSelector(
  selectRecipesState,
  fromRecipes.loading
);

export const selectSingleRecipe = createSelector(
  selectRecipesState,
  fromRecipes.selectedRecipe
);

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
