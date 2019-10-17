import types from './action_types'
export const addFavorite = item => ({
    type:types.ADD_FAVORITE,
    payload: item.payload
})