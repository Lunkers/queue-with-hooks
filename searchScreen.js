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
        { title: 'Best cat jump ever', service: 'Youtube', image: require('./images/youtube2.png'), mediaId: "YoutubeCat", youtubeId: "-5Ilq3kFxek" },
        { title: 'Look, Dandelion!', service: 'Youtube', image: require('./images/youtube3.png'), mediaId: 'YoutubeFlower', youtubeId: "b9KAWFdB2-w" },
        { title: 'Peppa Pig', service: 'Netflix', image: require('./images/netflix1.png'), mediaId: 'PeppaPig', youtubeId: "TRPLiomQcws" },
        { title: 'Breaking Bad', service: 'Netflix', image: require('./images/netflix2.jpg'), mediaId: 'BreakingBad', youtubeId: "F1HNuAE9WdU" },
        { title: 'Hey mama', service: 'Spotify', image: require('./images/spotify1.jpg'), mediaId: 'kanye', youtubeId: "cnYEsQRBU4Q" },
        { title: 'Instant Crush', service: 'Spotify', image: require('./images/spotify6.jpeg'), mediaId: 'daft', youtubeId: "53Ei90TRsBc" },
        { title: 'overcooked', service: 'Steam', image: require('./images/steam2.png'), mediaId: 'overcooked', youtubeId: "0n1x-zd7gZM" },
        { title: 'Cuphead', service: 'Steam', image: require('./images/steam5.jpg'), mediaId: 'cup', youtubeId: "NN-9SQXoi50" },
    ]


    const [results, updateResults] = React.useState(searchResults);
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
                <MaterialIcons name="search" size={25} color="white" />
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
        marginTop: 32,
        borderRadius: 10
    },

}
SearchView.navigationOptions = {
    tabBarIcon: () => (<MaterialIcons name="search" size={32} color="#A64253" />)
}

export default SearchView
