import { Loop, liftState } from 'redux-loop';
import { compose } from 'redux';
import { Actions } from './types/actions.type';

export type State = {
  counter: number,
}

export const defaultState: State = {
  counter: 3
}

export const reducer = (state: State | undefined, action: Actions): State | Loop<State> => {
  if (!state) return defaultState; // mandatory by redux
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, counter: state.counter + 1};
    case 'DECREMENT':
      return { ...state, counter: state.counter - 1};
    case 'SELECT_PICTURE':
      throw 'Not Implemented';
    case 'CLOSE_MODAL':
      throw 'Not Implemented';
    case 'FETCH_CATS_REQUEST':
      throw 'Not Implemented';
    case 'FETCH_CATS_COMMIT':
      throw 'Not Implemented';
    case 'FETCH_CATS_ROLLBACK':
      throw 'Not Implemented';
  }
};

export const counterSelector = (state: State) => {
  throw 'Not Implemented';
};
export const picturesSelector = (state: State) => {
  throw 'Not Implemented';
};
export const getSelectedPicture = (state: State) => {
  throw 'Not Implemented';
};

export default compose(liftState, reducer);
