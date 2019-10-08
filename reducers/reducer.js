import types from '../actions/action_types';

export const getQueue = (state = {}) => state.queue

/**
 * reducers
 */
export default (state, action) => {
    switch (action.type) {
        case types.ADD_ITEM: {
            const itemToAdd = {
                ...action.payload,
                id: state.queue.length + 1
            }
            return {
                ...state,
                queue: [...state.queue, itemToAdd]
            }
        }

        case types.REMOVE_ITEM: {
            const { payload } = action
            const filteredQueue = state.queue.filter(i => i.id != payload.id)
            return {
                ...state,
                queue: filteredQueue,
            }
        }
        default: {
            return state
        }
    }
}