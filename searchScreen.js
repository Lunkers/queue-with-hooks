import React from 'react'
import { StyleSheet, Text, View, ScrollView, Button, TextInput, Image, TouchableOpacity } from 'react-native';
import { StateContext, DispatchContext } from './context/context'
import { getQueue } from './reducers/reducer'
import { addItem } from './actions/add_item'
import types from './actions/action_types'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import QueueCard from './QueueCard'

const SearchView = ({ navigation }) => {

    const state = React.useContext(StateContext)
    const dispatch = React.useContext(DispatchContext);
    const [searchState, updateSearchText] = React.useState()
    const [showFilters, changeShowFilters] = React.useState(false)

    const searchResults = [
        { title: 'I love my wife', service: 'Spotify', image: require('./images/album1.png'), mediaId: "Song1", youtubeId: "TQcGnEhciNY" },
        { title: 'Friends', service: 'Netflix', image: require('./images/fronds.png'), mediaId: 'Netflix1', youtubeId: "Kl7WUJRyyEk" },
        { title: 'Doot Doot xd', service: 'Youtube', image: require('./images/video1.png'), mediaId: 'Youtube1', youtubeId: "eVrYbKBrI7o" },
        { title: 'Jackbox', service: 'Steam', image: require('./images/album2.png'), mediaId: 'jackbox', youtubeId: "yhW8PfKB828" },
        { title: 'overcooked', service: 'Steam', image: require('./images/album2.png'), mediaId: 'overcooked', youtubeId: "0n1x-zd7gZM" },
        { title: 'music 3', service: 'Spotify', image: require('./images/album2.png'), mediaId: 'Song3', youtubeId: "YU3eDa8ehzc" },
    ]

    const addMedia = (item) => dispatch(addItem({
        type: types.ADD_ITEM,
        payload: item
    }))


    return (
        <View style={styles.scrollView}>
            <View style={styles.searchBox}>
                <MaterialIcons name="search" size={32} color="white" />
                <TextInput placeholder="search" onChange={text => updateSearchText(text)} style={{ width: "75%" }} />
                <Button title="filters" color="#FCE7CF" borderRadius={5} onPress={() => changeShowFilters(!showFilters)}></Button>
            </View>
            {searchState && searchState !== '' && searchResults.map(result => (
                <TouchableOpacity onPress={() => addMedia(result)} key={result.mediaId}>
                    <QueueCard key={result.mediaId} item={result} inQueue={false}/>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = {
    queueItem: {
        backgroundColor: "green",
        color: "#fff",
        marginTop: 10,
        marginBottom: 10,
        width: "80%"
    },
    scrollView: {
        marginTop: 25,
        height: "100%",
        width: "100%",
        backgroundColor: "#634B66",
        alignItems: 'center'
    },
    searchBox: {
        backgroundColor: "#FCE7CF",
        width: "90%",
        height: "5%",
        color: "#FCE7CF",
        flexDirection: "row",
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 10
    },
    
}
SearchView.navigationOptions = {
    tabBarIcon: () => (<MaterialIcons name="search" size={32} />)
}

export default SearchView