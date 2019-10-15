
import React from 'react'
import { Animated, StyleSheet, Text, View, ScrollView,Image, TouchableOpacity } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { StateContext, DispatchContext } from './context/context'
import { removeItem } from './actions/remove_item';
import types from './actions/action_types';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';


export default QueueCard = ({ item, inQueue }) => {
    const dispatch = React.useContext(DispatchContext);
    let _swip = React.createRef();
    const renderLeft = (progress, dragX) => (<View style={styles.infoCard}>
        <MaterialIcons name="queue" size={32} />
        <MaterialCommunityIcons size={32} name="heart-outline"/>
        <MaterialCommunityIcons name="dots-vertical" size={38} onPress={() => _swip.current.close()}/>
    </View>)
    const deleteItem = () => dispatch(removeItem({
        type: types.REMOVE_ITEM,
        payload: item
    }))
    const addItem = () => dispatch(addItem({
        type: types.ADD_ITEM,
        payload: item
    }))
    
    const renderRight = (progress, dragX) => (
        <TouchableOpacity onPress={() => inQueue ? deleteItem() : addItem()}>
            <View style={inQueue ? styles.deleteMenu : styles.addMenu}>
                <MaterialIcons name={inQueue ? "delete" : "add"} size={32} />
            </View>
        </TouchableOpacity>
    )
    return (
        <Swipeable renderLeftActions={renderLeft} style={styles.card} renderRightActions={renderRight} ref={_swip}>
            <View style={styles.card}>
                <View style={styles.card}>

                    <MaterialCommunityIcons name="dots-vertical" size={38} onPress={() => _swip.current.openLeft()}/>
                    <Image source={item.image} style={{ width: 60, height: 60, }} />
                    <View>
                        <Text>{item.title}</Text>
                        <Text>{item.service}</Text>
                    </View>
                </View>
            </View>
        </Swipeable>
    )
}

const styles = {
    card: {
        justifyContent: "space-around",
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: "#A64253",
        border: "1px solid black",
        color: "#fff",
        borderRadius: 5,
        width: "95%",
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 5,
    },
    infoCard: {
        backgroundColor: "#D6A99A",
        flex: 1,
        color: "#fff",
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        alignItems:'center',
        justifyContent:'space-around',
        flexDirection: 'row'
    },
    deleteMenu: {
        backgroundColor: "red",
        justifyContent: "flex-end",
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        height: '100%',
        alignItems:'center'
    },
    addMenu: {
        backgroundColor: "green",
        justifyContent: "flex-end",
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        height: '100%',
        width: "30%",
        alignItems:'center',
        flex:1,
        borderRadius: 5
    }

}