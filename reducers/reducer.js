import types from '../actions/action_types';
import getPubNub from '../pubnub';

export const getQueue = (state = {}) => state.queue
export const getFavorites = (state = {}) => state.favorites

/**
 * reducers
 */
export default (state, action) => {
    switch (action.type) {
        case types.PAUSE_ITEM: {
            const { payload } = action

            if (action.doNotSendMessage !== true) {
                getPubNub().publish({
                    message: {
                      action: payload
                    },
                    channel: 'Queue'
                });
            }

            return {
                ...state,
                isPaused: !state.isPaused
            }
        }

        case types.ADD_ITEM: {
            const itemToAdd = {
                ...action.payload,
                id: state.queue.length + 1
            }

            let shouldSend = (action.doNotSendMessage !== true);

            if (shouldSend) {
                getPubNub().publish({
                    message: {
                        action: 'add',
                        item: itemToAdd
                    },
                    channel: 'Queue'
                });
            }

            return {
                ...state,
                queue: [...state.queue, itemToAdd]
            }
        }

        case types.REMOVE_ITEM: {
            const { payload } = action
            const filteredQueue = state.queue.filter(i => i.id != payload.id)

            if (action.doNotSendMessage !== true) {
                getPubNub().publish({
                    message: {
                        action: 'remove',
                        item: payload
                    },
                    channel: 'Queue'
                });
            }

            return {
                ...state,
                queue: filteredQueue,
            }
        }

        case types.ADD_FAVORITE: {
            const favToAdd = {
                ...action.payload,
                id: state.favorites.length + 1
            }

            return {
                ...state,
                favorites: [...state.favorites, favToAdd]
            }
        }

        case types.REMOVE_FAVORITE: {
            const {payload} = action
            const filteredFavorites = state.favorites.filter(i => i.id !== payload.id)

            return {
                ...state,
                favorites: filteredFavorites
            }
        }
        default: {
            return state
        }
    }
}
