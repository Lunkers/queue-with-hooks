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
        <SafeAreaView style={styles.scrollView}>
            <Text style={{ color: "#FFF", marginTop: 22 }}> OOOOOO I LOVE MY WIFE</Text>
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
        backgroundColor: "#634B66"
    },
}

Favorites.navigationOptions = {
    tabBarIcon: () => (<MaterialCommunityIcons name="heart" size={32} color="#A64253"/>)
}

export default Favorites;