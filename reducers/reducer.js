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

            let shouldSend = (action.doNotSendMessage !== true);

            console.log(itemToAdd);

            //console.log(action);
            //console.log("Ska vi skicka? " +  (shouldSend ? "Kör på" : "Nej vi skiter i det"));

            if (shouldSend) {
                console.log("Tjoff!");
                getPubNub().publish({
                    message: {
                      action: 'add',
                      item: itemToAdd
                    },
                    channel: 'joppesqueue'
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
                    channel: 'joppesqueue'
                });
            }

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
