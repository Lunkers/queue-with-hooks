import React, {useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView, Button, TextInput } from 'react-native';
import { StateContext, DispatchContext } from './context/context'
import { getQueue } from './reducers/reducer'
import types from './actions/action_types'
import QueueCard from './QueueCard'
import { addItem } from './actions/add_item'
import { removeItem } from './actions/remove_item'
import getPubNub from './pubnub';
import { MaterialIcons } from '@expo/vector-icons';

const QueueScreen = ({ navigation }) => {

    const state = React.useContext(StateContext);
    const dispatch = React.useContext(DispatchContext);

    const [users, setUsers] = React.useState([]);

    const addMedia = (item) => dispatch({
        type: types.ADD_ITEM,
        payload: item,
        doNotSendMessage: true
    })

    const removeMedia = item => dispatch({
        type: types.REMOVE_ITEM,
        payload: item,
        doNotSendMessage: true
    })

    useEffect(() => {
        let pubnub = getPubNub();

        let listener = {
            message: (m) => {
                console.log("Nytt brev!");
                if (m.publisher != getPubNub().getUUID()) {
                    if (m.message.action == "add") {
                        addMedia(m.message.item);
                    }
                    else if (m.message.action == "remove") {
                        removeMedia(m.message.item);
                    }
                }
            }
        };

        pubnub.addListener(listener);

        return () => {
            pubnub.removeListener(listener);
        };
    });

    return (

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
            <Text style={styles.headerText}>hiva</Text>
            {getQueue(state).map(item => (<QueueCard key={item.id} item={item} inQueue={true} />))}
        </ScrollView>
    )
}



const styles = {
    queueItem: {
        backgroundColor: "cyan",

    },
    scrollView: {
        height: "100%",
        width: "100%",
        backgroundColor: "#634B66"
    },
    button: {
        flex: 1,

    },
    container: {
        justifyContent: 'center',
        textAlign: "center",
        paddingLeft: 20,
        paddingRight: 20
    },
    headerText: {
        marginTop: 22,
        color: "white",
        fontSize: 32,
    }
}

export default QueueScreen
