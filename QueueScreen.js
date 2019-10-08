import React from 'react'
import { StyleSheet, Text, View, ScrollView, Button, TextInput } from 'react-native';
import { StateContext, DispatchContext } from './context/context'
import { getQueue } from './reducers/reducer'
import types from './actions/action_types'
import QueueCard from './QueueCard'
import { removeItem } from './actions/remove_item'

const QueueScreen = ({navigation}) => {

    const state = React.useContext(StateContext);
    const dispatch = React.useContext(DispatchContext)

    const removeItem = item => dispatch(removeItem({
        type: types.REMOVE_ITEM,
        payload: item
    }))
    const handlePress = () => navigation.navigate('Search')
    return (
        <View>
            
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
                {getQueue(state).map(item => (<QueueCard key={item.id} id={item.id} title={item.title} service={item.service} swipeClose={() => removeItem(item)}/>))}
            </ScrollView>
            <Button style={styles.button} title="Add item" onPress={() => handlePress()} />
        </View>
    )
}



const styles = {
    queueItem: {
        backgroundColor:"cyan",

    },
    scrollView: {
        height: "80%",
        width: "100%"
    },
    button: {
        flex: 1,
        
    },
    container: {
        justifyContent: 'center',
      }
}

export default QueueScreen