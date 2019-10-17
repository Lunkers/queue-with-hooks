import React from 'react'
import { StyleSheet, Text, View, ScrollView, Button, TextInput, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { StateContext, DispatchContext } from './context/context'
import { getQueue } from './reducers/reducer'
import { addItem } from './actions/add_item'
import types from './actions/action_types'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import QueueCard from './QueueCard'
import { showMessage } from 'react-native-flash-message';

const SearchView = ({ navigation }) => {

    const state = React.useContext(StateContext)
    const dispatch = React.useContext(DispatchContext);
    const [searchState, updateSearchText] = React.useState()
    const [showFilters, changeShowFilters] = React.useState(false)
    const [filter, updateFilter] = React.useState(null)

    const searchResults = [
        { title: 'I love my wife', service: 'Spotify', image: require('./images/album1.png'), mediaId: "Song1", youtubeId: "TQcGnEhciNY" },
        { title: 'Friends', service: 'Netflix', image: require('./images/fronds.png'), mediaId: 'Netflix1', youtubeId: "Kl7WUJRyyEk" },
        { title: 'Doot Doot xd', service: 'Youtube', image: require('./images/video1.png'), mediaId: 'Youtube1', youtubeId: "eVrYbKBrI7o" },
        { title: 'Jackbox', service: 'Steam', image: require('./images/album2.png'), mediaId: 'jackbox', youtubeId: "yhW8PfKB828" },
        { title: 'overcooked', service: 'Steam', image: require('./images/album2.png'), mediaId: 'overcooked', youtubeId: "0n1x-zd7gZM" },
        { title: 'music 3', service: 'Spotify', image: require('./images/album2.png'), mediaId: 'Song3', youtubeId: "YU3eDa8ehzc" },
    ]


    const [results, updateResults] = React.useState(searchResults);
    console.log(results)
    const addMedia = (item) => {
        showMessage({
            message: 'added to queue!',
            type: 'success'
        })
        dispatch(addItem({
            type: types.ADD_ITEM,
            payload: item
        }))
    }

    const filterMedia = service => {
        if (service === filter) {
            updateResults(searchResults);
            updateFilter(null)
        }
        else {
            const filtered = searchResults.filter(result => result.service === service)
            updateFilter(service)
            updateResults(filtered)
        }
    }


    return (
        <SafeAreaView style={styles.scrollView}>
            <View style={styles.searchBox}>
                <MaterialIcons name="search" size={32} color="#A64253" />
                <TextInput placeholder="search" onChange={text => updateSearchText(text)} style={{ width: "75%" }} />
                <Button title="filters" color="#FCE7CF" borderRadius={5} onPress={() => changeShowFilters(!showFilters)}></Button>
            </View>
            {showFilters && <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '90%'}}>
                <Button onPress={() => filterMedia("Spotify")} title="spotify" color={filter === "Spotify" ?  "#D6A99A":"#FCE7CF"} borderRadius={5}>SPOOFY</Button>
                <Button onPress={() => filterMedia("Netflix")} title="netflix" color={filter === "Netflix" ? "#D6A99A":"#FCE7CF"} borderRadius={5}>Netflix</Button>
                <Button onPress={() => filterMedia("Youtube")} title="youtube" color={filter === "Youtube"? "#D6A99A": "#FCE7CF"} borderRadius={5}>Youtube</Button>
                <Button onPress={() => filterMedia("Steam")} title="steam" color={filter === "Steam"? "#D6A99A":"#FCE7CF"} borderRadius={5}>Steam</Button>
            </View>}
            <ScrollView style={{ marginBottom: 50 }} contentContainerStyle={{ alignItems: 'center' }}>
                {searchState && searchState !== '' && results.map(result => (
                    <TouchableOpacity onPress={() => addMedia(result)} key={result.mediaId}>
                        <QueueCard key={result.mediaId} item={result} inQueue={false} />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
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
    tabBarIcon: () => (<MaterialIcons name="search" size={32} color="#A64253" />)
}

export default SearchView
