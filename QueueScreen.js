import React from 'react'
import { StyleSheet, Text, View, ScrollView, Button, TextInput } from 'react-native';
import { StateContext, DispatchContext } from './context/context'
import { getQueue } from './reducers/reducer'
import { addItem } from './actions/add_item'
import types from './actions/action_types'

const QueueScreen = ({navigation}) => {

    const state = React.useContext(StateContext);
    const handlePress = () => navigation.navigate('Search')
    console.log('sup bithces')
    return (
        <View>
            
            <ScrollView style={styles.scrollView}>
                {getQueue(state).map(item => (<View style={styles.queueItem}>
                    <Text>{item.title} {item.service}</Text>
                </View>
                ))}
            </ScrollView>
            <Button style={styles.button} title="Add item" onPress={() => handlePress()} />
        </View>
    )
}

QueueScreen.navigationOptions = ({navigation})=> ({
    headerTitle: (
        <View >
            <TextInput placeholder="search" onChangeText={()=> navigation.navigate("Search")}/>
        </View>
    )
})

const styles = {
    queueItem: {
        backgroundColor:"cyan",

    },
    scrollView: {
        height: "80%"
    },
    button: {
        flex: 1,
        
    },
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
      }
}

export default QueueScreen