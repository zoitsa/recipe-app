import { Action } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { RecipesActions, RecipesActionTypes, Get, Select, SelectComplete } from '../actions/recipes.actions';

export interface State {
    loading: boolean;
    searchTerms: string;
    results: Object[];
    selectedRecipe: any;
    uri: string;
}


export const initialState: State = {
    loading: false,
    searchTerms: '',
    results: [],
    selectedRecipe: [],
    uri: ''
};


export function reducer(state = initialState, action: RecipesActions): State {

    switch (action.type) {

      case RecipesActionTypes.GET:
      return {
        ...state,
        loading: true,
        searchTerms: action.payload
      };

      case RecipesActionTypes.GET_COMPLETE:
      console.log(action.payload);
      return {
        ...state,
          loading: false,
          results: action.payload
      };

      case RecipesActionTypes.SELECT:
      return {
        ...state,
        loading: true,
        uri: action.payload

      };

      case RecipesActionTypes.SELECT_COMPLETE:
      console.log(action.payload);
      return {
        ...state,
          loading: false,
          selectedRecipe: action.payload
      };



      default:
        return state;
    }
  }

  // export const {
  //   selectEntities: selectRecipeEntities,
  //   selectAll: selectAllRecipes,
  //   selectIds: selectRecipeIds,
  // } = adapter.getSelectors();

export const results = (state: State) => state.results;
export const loading = (state: State) => state.loading;
// export const getSelectedRecipeId = (state: State) => state.selectedId;
