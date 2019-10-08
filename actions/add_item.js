import types from './action_types'
export const addItem = item =>({
    type:types.ADD_ITEM,
    payload: item.payload,
});