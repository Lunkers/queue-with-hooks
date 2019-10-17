import React, { useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Button, TextInput, Image, SafeAreaView } from 'react-native';
import { StateContext, DispatchContext } from './context/context'
import { getFavorites } from './reducers/reducer'
import types from './actions/action_types'
import QueueCard from './QueueCard'
import { addItem } from './actions/add_item'
import { removeItem } from './actions/remove_item'
import getPubNub from './pubnub';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';


const Favorites = ({ navigation }) => {
    const state = React.useContext(StateContext);
    return (
        <SafeAreaView style={{...styles.scrollView, alignItems: 'center'}}>
            <Text style={styles.headerText}>My Favorites</Text>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>

                {getFavorites(state).map(item => (<QueueCard key={item.id} item={item} inQueue={true} />))}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = {
    scrollView: {
        height: "100%",
        width: "100%",
        backgroundColor: "#634B66",
        
    },
    headerText: {
        color: '#FEE7D1',
        fontSize: 22,
        marginLeft: 10,
        marginTop: 25
    },
}

Favorites.navigationOptions = {
    tabBarIcon: () => (<MaterialCommunityIcons name="heart" size={32} color="#A64253"/>)
}

export default Favorites;