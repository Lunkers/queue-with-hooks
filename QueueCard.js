
import React from 'react'
import { Animated, StyleSheet, Text, View, ScrollView, Button, TextInput } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { StateContext, DispatchContext } from './context/context'


export default QueueCard = ({ id, title, service, swipeClose }) => {
    const renderLeft = (progress, dragX) => (<View style={styles.deleteCard}>
        <Text> Cool beans </Text>
    </View>)

    const renderRight = (progress, dragX) => (
        <View style={styles.deleteCard}>
            <Text> Remove from queue</Text>
        </View>
    )
    return (
        <Swipeable renderLeftActions={renderLeft} style={styles.card} renderRightActions={renderRight}>
            <View style={styles.card}>
                <Text>{id}</Text>
                <Text>{title}</Text>
                <Text>{service}</Text>
            </View>
        </Swipeable>
    )
}

const styles = {
    card: {
        justifyContent: "center",
        flex: 0.8,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: "#fff",
        border: "1px solid black"
    },
    deleteCard: {
        backgroundColor: "green",
        flex: 0.8,
        color: "#fff",
        marginTop: 10,
        marginBottom: 10,
    }
}