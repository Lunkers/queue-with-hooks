import types from './action_types'
export const removeFavorite = item =>({
    type:types.REMOVE_FAVORITE,
    payload: item.payload
})