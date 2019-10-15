import React, { useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Button, TextInput, Image } from 'react-native';
import { StateContext, DispatchContext } from './context/context'
import { getQueue } from './reducers/reducer'
import types from './actions/action_types'
import QueueCard from './QueueCard'
import { removeItem } from './actions/remove_item'
import getPubNub from './pubnub';
import { MaterialIcons } from '@expo/vector-icons';

const QueueScreen = ({ navigation }) => {

    const state = React.useContext(StateContext);
    const dispatch = React.useContext(DispatchContext);

    const [users, setUsers] = React.useState([]);

    const addItem = (item) => dispatch(addItem({
        type: types.ADD_ITEM,
        payload: item
    }))

    const removeItem = item => dispatch(removeItem({
        type: types.REMOVE_ITEM,
        payload: item
    }))

    useEffect(() => {
        let pubnub = getPubNub();

        let listener = {
            message: (m) => {
                if (m.publisher != getPubNub().getUUID()) {
                    if (m.message.action == "add") {
                        addItem(m.message.item);
                    }
                    else if (m.message.action == "remove") {
                        removeItem(m.message.item);
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
            <View style={{ flexDirection: "row", marginTop: 22 }}>
                <Image source={require("./images/hivaLogo.png")} style={styles.logo} />
                <Text style={styles.headerText}>hiva</Text>
            </View>
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
        color: "white",
        fontSize: 22,
        marginLeft: 10,
        marginTop:10
    },
    logo: {
        width: 40, height: 43
    }
}

export default QueueScreen
