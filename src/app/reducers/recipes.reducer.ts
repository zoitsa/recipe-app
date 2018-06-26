import { Action } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { RecipesActions, RecipesActionTypes, Get, Select, SelectComplete } from '../actions/recipes.actions';

export interface State extends EntityState<any> {
    loading: boolean;
    searchTerms: string;
    selectedId: string;
    // uri: string;
}

export const adapter: EntityAdapter<any> = createEntityAdapter<any>({
  selectId: (recipes: any) => recipes.recipe.uri,
});

export const initialState: State = adapter.getInitialState ({
    loading: false,
    searchTerms: '',
    selectedId: 'null',
    // uri: ''
});

export function reducer(state = initialState, action: RecipesActions): State {

    switch (action.type) {

      case RecipesActionTypes.GET:
      return {
        ...state,
        loading: true,
        searchTerms: action.payload
      };

      case RecipesActionTypes.GET_COMPLETE:
      return adapter.addMany(action.payload.hits, {
        ...state,
          loading: false,
          // results: action.payload.hits
      });

      case RecipesActionTypes.SELECT:
      return {
        ...state,
        loading: true,
        selectedId: action.payload

      };

      // case RecipesActionTypes.SELECT_COMPLETE:
      // return {
      //   ...state,
      //     loading: false,
      //     selectedRecipe: action.payload[0]
      // };

      default:
        return state;
    }
  }

  export const {
    selectEntities: selectRecipeEntities,
    selectAll: selectAllRecipes,
    selectIds: selectRecipeIds,
  } = adapter.getSelectors();


// export const results = (state: State) => state.results;
export const loading = (state: State) => state.loading;
export const getSelectedRecipeId = (state: State) => state.selectedId;
// export const selectedRecipe = (state: State) => state.selectedRecipe;
