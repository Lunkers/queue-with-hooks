import types from './action_types'
export const removeItem = item => ({
    type: types.REMOVE_ITEM,
    payload: item.payload
})