import React from 'react'
import { StyleSheet, Text, View, ScrollView, Button, TextInput } from 'react-native';
import { StateContext, DispatchContext } from './context/context'
import { getQueue } from './reducers/reducer'
import { addItem } from './actions/add_item'
import types from './actions/action_types'

const SearchView = ({navigation}) => {
    
    const state = React.useContext(StateContext)
    const dispatch = React.useContext(DispatchContext);

    const searchResults = [
        { title: 'I love my wife', service: 'Spotify' },
        { title: 'Friends', service: 'Netflix' },
        { title: 'Doot Doot xd', service: 'Youtube' },
        { title: 'Video Game', service: 'Steam' },
    ]

    const addMedia = (item) => dispatch(addItem({
        type: types.ADD_ITEM,
        payload: item
    }))

    const handleNavigation = () => {
        navigation.navigate('Queue')
    }
    console.log('In search')
    return (
        <View style={styles.scrollView}>
            {searchResults.map(result => (
                <Button onPress={() => addMedia(result)} title={result.title} key={result.title}></Button>
            ))}
        </View>
    )
}

const styles = {
    queueItem: {
        backgroundColor:"cyan",

    },
    scrollView: {
        backgroundColor: "grey",
        width: "100%",
        height: "100%"
    },
}
SearchView.navigationOptions = {
    headerTitle: (
        <View >
            <TextInput placeholder="search"/>
        </View>
    )
}

export default SearchView