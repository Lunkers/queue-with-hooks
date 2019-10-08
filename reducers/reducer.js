import types from '../actions/action_types';

export const getQueue = (state = {}) => state.queue

/**
 * reducers
 */
export default (state, action) => {
    switch(action.type){
        case types.ADD_ITEM: {
            const itemToAdd = {
                ...action.payload,
                id: state.queue.length + 1
            }
            return {
                ...state,
                queue: [...state.queue, action.payload] 
            }
        }
        default: {
            return state
        }
    }
}