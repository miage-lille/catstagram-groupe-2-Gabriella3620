import { Loop, liftState, loop } from 'redux-loop';
import { compose } from 'redux';
import { Actions, Increment, Decrement } from './types/actions.type';
import { increment } from 'fp-ts/lib/function';
import { Picture } from './types/picture.type';
import fakeData from './fake-datas.json';
import { cons } from 'fp-ts/lib/ReadonlyNonEmptyArray';
import * as O from 'fp-ts/Option'
import { cmdFetch } from './commands';
import { fetchCatsRequest } from './actions';

import { loading, success, failure } from './api';
import { ApiStatus } from './types/api.type';
 

export type State = {
  counter: number,
  pictures: ApiStatus,
  selectedPicture: O.Option<Picture>
}

export const defaultState: State = {
  counter: 0,
  pictures: loading(),
  selectedPicture: O.none
}


export const reducer = (state: State | undefined, action: Actions): State | Loop<State> => {
  if (!state) return defaultState; // mandatory by redux
  switch (action.type) {
    case 'INCREMENT':
      const incrementedCounter = state.counter + 1;
      return loop(
        { ...state, counter: incrementedCounter, pictures: loading() },
        cmdFetch(fetchCatsRequest(incrementedCounter))
      );

    case 'DECREMENT':
      if (state.counter > 3) {
        const decrementedCounter = state.counter - 1;
        return loop(
          { ...state, counter: decrementedCounter, pictures: loading() },
          cmdFetch(fetchCatsRequest(decrementedCounter))
        );
      }
      throw 'Operation not allowed';

    case 'FETCH_CATS_COMMIT':
      return { ...state, pictures: success(action.payload) };

    case 'FETCH_CATS_ROLLBACK':
      console.error(action.error);
      return { ...state, pictures: failure(action.error.message) };

    case 'SELECT_PICTURE':
      return { ...state, selectedPicture: O.some(action.picture) };

    case 'CLOSE_MODAL':
      return { ...state, selectedPicture: O.none };

    default:
      return state;
  }
};

export const counterSelector = (state: State) => {
  return state.counter;
};
export const picturesSelector = (state: State) => {
  return state.pictures;
};
export const getSelectedPicture = (state: State) => {
  return state.selectedPicture;
};

export default compose(liftState, reducer);
