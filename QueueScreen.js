import React, { useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Button, TextInput, Image, SafeAreaView } from 'react-native';
import { StateContext, DispatchContext } from './context/context'
import { getQueue } from './reducers/reducer'
import types from './actions/action_types'
import QueueCard from './QueueCard'
import { addItem } from './actions/add_item'
import { removeItem } from './actions/remove_item'
import getPubNub from './pubnub';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const QueueScreen = ({ navigation }) => {

    const state = React.useContext(StateContext);
    const dispatch = React.useContext(DispatchContext);
    const q = getQueue(state)
    const [users, setUsers] = React.useState([]);
    const nowPlaying = q[0]

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

    const skipMedia = item => dispatch({
        type: types.REMOVE_ITEM,
        payload: item
    })

    const pauseMedia = (item, action) => dispatch({
        type: types.PAUSE_ITEM,
        payload: action

    })
    const UpauseMedia = (item, action) => dispatch({
        type: types.PAUSE_ITEM,
        payload: action,
        doNotSendMessage: true

    })

    const addFavorite = item => dispatch({
        type: types.ADD_FAVORITE,
        payload: item
    })

    useEffect(() => {
        let pubnub = getPubNub();

        let listener = {
            message: (m) => {
                if (m.publisher != getPubNub().getUUID()) {
                    if (m.message.action == "add") {
                        addMedia(m.message.item);
                    }
                    else if (m.message.action == "remove") {
                        removeMedia(m.message.item);
                    }
                    else if (m.message.action == "pause" | "play") {
                        UpauseMedia(m.message.item);
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
        <SafeAreaView style={{ ...styles.scrollView, alignItems: 'center' }}>
            {nowPlaying !== undefined &&
                <View>
                    <Text style={styles.headerText}>Now playing:</Text>
                    <View style={{ backgroundColor: '#A64253', paddingTop: 10, paddingHorizontal: 20, borderRadius: 5, }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={nowPlaying.image} style={{ width: 100, height: 100, marginRight: 10 }} />
                            <View>
                                <Text style={styles.nowPlaying}>{nowPlaying.title}</Text>
                                <Text style={styles.service}>{nowPlaying.service}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <MaterialCommunityIcons name={state.isPaused ? "play" : "pause"} size={35} style={styles.buttons} color="white" onPress={() => pauseMedia(nowPlaying, state.isPaused ? "play" : "pause")} />
                            <MaterialCommunityIcons name="skip-next" size={35} color="white" style={styles.buttons} onPress={() => skipMedia(nowPlaying)} />
                        </View>
                    </View>
                    <Text style={styles.headerText}>Next playing:</Text>
                </View>}
                { nowPlaying === undefined && 
                <View style={{ flexDirection: "row", marginTop: 22 }}>
                <Image source={require("./images/hivaLogo.png")} style={styles.logo} />
                <Text style={styles.headerText}>hiva</Text>
    </View>}
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
                {getQueue(state).map(item => (nowPlaying !== item && <QueueCard key={item.id} item={item} inQueue={true} />))}
            </ScrollView>
        </SafeAreaView>
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
        alignItems: "center",
        paddingLeft: 20,
        paddingRight: 20
    },
    headerText: {
        color: '#FEE7D1',
        fontSize: 22,
        marginLeft: 10,
        marginTop: 10
    },
    logo: {
        width: 40, height: 42
    },
    nowPlaying: {
        color: "white",
        fontSize: 18
    },
    service: {
        color: "white",
        fontSize: 15
    },
    buttons: {
        paddingHorizontal: 2
    }
}

QueueScreen.navigationOptions = {
    tabBarIcon: () => (<MaterialIcons name="video-library" size={32} color="#A64253" />)
}

export default QueueScreen
