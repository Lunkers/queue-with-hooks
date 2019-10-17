import types from './action_types'
export const pauseItem = item => ({
    type: types.PAUSE_ITEM,
    payload: item.payload
})