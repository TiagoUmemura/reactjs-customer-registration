import { CLICK_UPDATE_VALUE } from '../actions/actionsType';
const initialState = {
  newValue: 'Nao tem nada'
};
export const clickReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLICK_UPDATE_VALUE:
      return {
        ...state,
        newValue: action.value
      };
    default:
      return state;
  }
};