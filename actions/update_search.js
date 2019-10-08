import types from './action_types'
export const addItem = action =>({
    type:types.UPDATE_SEARCH,
    payload: action.payload,
});