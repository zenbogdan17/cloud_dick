const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';

const defaultState = {
  loader: false,
};

export default function userReducer(state = defaultState, action) {
  switch (action.type) {
    case SHOW_LOADER:
      return { ...state, loader: true };
    case HIDE_LOADER:
      return { ...state, loader: false };
    default:
      return state;
  }
}

export const showLoader = (user) => ({ type: SHOW_LOADER });
export const hideLoader = (user) => ({ type: HIDE_LOADER });
