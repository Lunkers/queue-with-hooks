import types from '.actions/types'
export const addFavorite = item => ({
    type:types.ADD_FAVORITE,
    payload: item.payload
})