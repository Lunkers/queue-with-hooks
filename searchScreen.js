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
        {title: "Brock's best line", service: "Youtube", image: require('./images/youtube1.png'), mediaId: 'YoutubeBrock', youtubeId: "oawUi9s3ENE"},
        { title: 'Best cat jump ever', service: 'Youtube', image: require('./images/youtube2.png'), mediaId: "YoutubeCat", youtubeId: "-5Ilq3kFxek" },
        { title: 'Look, Dandelion!', service: 'Youtube', image: require('./images/youtube3.png'), mediaId: 'YoutubeFlower', youtubeId: "b9KAWFdB2-w" },
        { title: "You're derefe...", service: 'Youtube', image: require('./images/youtube4.png'), mediaId: 'YoutubePointer', youtubeId: "bLHL75H_VEM" },
        { title: 'Long video', service: 'Youtube', image: require('./images/youtube5.png'), mediaId: 'YoutubeLong', youtubeId: "FCPdIvXo2rU" },
        { title: 'Peppa Pig', service: 'Netflix', image: require('./images/netflix1.png'), mediaId: 'PeppaPig', youtubeId: "TRPLiomQcws" },
        { title: 'Breaking Bad', service: 'Netflix', image: require('./images/netflix2.jpg'), mediaId: 'BreakingBad', youtubeId: "F1HNuAE9WdU" },
        { title: 'Pose', service: 'Netflix', image: require('./images/netflix3.jpg'), mediaId: 'Pose', youtubeId: "kugzOTLoZoA" },
        { title: 'Pulp fiction', service: 'Netflix', image: require('./images/netflix4.jpg'), mediaId: 'Pulp', youtubeId: "igATSoUU954" },
        { title: 'Nailed it!', service: 'Netflix', image: require('./images/netflix5.jpg'), mediaId: 'Nailed', youtubeId: "pb7CBZ952zs" },
        { title: 'Hey mama', service: 'Spotify', image: require('./images/spotify1.jpg'), mediaId: 'kanye', youtubeId: "cnYEsQRBU4Q" },
        { title: 'The Face I Love...', service: 'Spotify', image: require('./images/spotify2.jpg'), mediaId: 'Brazil', youtubeId: "YU3eDa8ehzc" },
        { title: 'Time Of The Sea...', service: 'Spotify', image: require('./images/spotify3.jpg'), mediaId: 'Mono', youtubeId: "mRD4w4wQSew" },
        { title: 'Gettysburg', service: 'Spotify', image: require('./images/spotify4.jpeg'), mediaId: 'Getty', youtubeId: "3wUrD_bqxPU" },
        { title: 'Und immer wie...', service: 'Spotify', image: require('./images/spotify5.jpeg'), mediaId: 'deutsch', youtubeId: "89tqvsI8qI4" },
        { title: 'Instant Crush', service: 'Spotify', image: require('./images/spotify6.jpeg'), mediaId: 'daft', youtubeId: "53Ei90TRsBc" },
        { title: 'overcooked', service: 'Steam', image: require('./images/steam2.png'), mediaId: 'overcooked', youtubeId: "0n1x-zd7gZM" },
        { title: 'The Jackbox par...', service: 'Steam', image: require('./images/steam1.jpg'), mediaId: 'jackbox', youtubeId: "yhW8PfKB828" },
        { title: 'Use your words', service: 'Steam', image: require('./images/steam3.png'), mediaId: 'words', youtubeId: "cFAjK4DVnWE" },
        { title: 'Lovers in a da...', service: 'Steam', image: require('./images/steam4.png'), mediaId: 'lovers', youtubeId: "5L20xxqDfII" },
        { title: 'Cuphead', service: 'Steam', image: require('./images/steam5.jpg'), mediaId: 'cup', youtubeId: "NN-9SQXoi50" },
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
        marginTop: 10,
        borderRadius: 10
    },

}
SearchView.navigationOptions = {
    tabBarIcon: () => (<MaterialIcons name="search" size={32} color="#A64253" />)
}

export default SearchView
