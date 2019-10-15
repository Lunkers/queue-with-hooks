import types from '../actions/action_types';
import getPubNub from '../pubnub';

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

            getPubNub().publish({
                message: {
                  action: 'add',
                  item: itemToAdd
                },
                channel: 'Queue'
            });

            return {
                ...state,
                queue: [...state.queue, itemToAdd]
            }
        }

        case types.REMOVE_ITEM: {
            const { payload } = action
            const filteredQueue = state.queue.filter(i => i.id != payload.id)

            getPubNub().publish({
                message: {
                  action: 'remove',
                  item: payload
                },
                channel: 'Queue'
            });

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
