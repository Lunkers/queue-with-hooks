
import React, {useState, useEffect} from 'react'
import { Animated, StyleSheet, Text, View, ScrollView,Image, TouchableOpacity } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { StateContext, DispatchContext } from './context/context'
import { removeItem } from './actions/remove_item';
import types from './actions/action_types';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { RectButton } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Haptics from 'expo-haptics';
import { addFavorite } from './actions/add_favorite'
import { showMessage } from 'react-native-flash-message';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

export default QueueCard = ({ item, inQueue }) => {
    const dispatch = React.useContext(DispatchContext);
    const [fadeAnim] = useState(new Animated.Value(1.0));
    let _swip = React.createRef();

    const renderLeft = (progress, dragX) => (<View style={styles.infoCard}>
        <MaterialIcons name="queue" size={32} />
        <MaterialCommunityIcons size={32} name="heart-outline"/>
        <MaterialCommunityIcons name="dots-vertical" size={38} onPress={() => _swip.current.close()}/>
    </View>)

    const deleteItem = () => dispatch(removeItem({
        type: types.REMOVE_ITEM,
        payload: item
    }))
    const addItem = () => dispatch(addItem({
        type: types.ADD_ITEM,
        payload: item
    }))

    var renderLeftAction = (progress, dragX) => {
        const trans = progress.interpolate({
          inputRange: [0, 1],
          outputRange: [-200, 0],
        });

        return (
          <Animated.View style={{ flex: 1, flexDirection: "row", transform: [{ translateX: trans }], opacity: fadeAnim }}>
            <RectButton
              style={[styles.action, { backgroundColor: "#ffab00" }]}
              onPress={() => {
                  /* HÄR HÄNDER DET */
                  dispatch(addFavorite({
                      type: types.ADD_FAVORITE,
                      payload: item
                  }));
                  showMessage({
                      message: 'Added to favorites!',
                      type: "success"
                  })
              }}>
              <MaterialCommunityIcons size={128} style={styles.actionText} name="heart-outline"/>
            </RectButton>
          </Animated.View>
        );
    };

    var renderRightAction = (progress) => {
        const trans = progress.interpolate({
          inputRange: [0, 1],
          outputRange: [192, 0],
        });

        return (
          <Animated.View style={{ flex: 1, flexDirection: "row", transform: [{ translateX: trans }], opacity: fadeAnim }}>
            <RectButton
              style={[styles.action, { backgroundColor: "#dd2c00" }]}
              onPress={() => deleteItem()}>
              <Text style={styles.actionText}>Remove</Text>
            </RectButton>
          </Animated.View>
        );
    };

    return (<Swipeable
        ref={_swip}
        friction={2}
        leftThreshold={80}
        rightThreshold={80}
        renderLeftActions={renderLeftAction}
        renderRightActions={renderRightAction}
        onSwipeableLeftWillOpen={() => {
            /* HÄR HÄNDER DET */
            dispatch(addFavorite({
                type: types.ADD_FAVORITE,
                payload: item
            }))
            showMessage({
                message: 'Added to favorites!',
                type: "success"
            })
            _swip.current.close();
        }}
        onSwipeableRightWillOpen={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

            Animated.timing(fadeAnim,{
                toValue: 0.0,
                duration: 500,
                useNativeDriver: true
            }).start(() => {
                deleteItem();
            });
        }}
        >
        <Animated.View style={{opacity: fadeAnim}}>
            <View style={styles.card}>
                <MaterialCommunityIcons name="dots-vertical" size={38} color="#FEE7D1" onPress={() => _swip.current.openLeft()}/>
                <Image source={item.image} style={{ width: 60, height: 60, }} />
                <View>
                    <Text style={styles.service}>{item.title}</Text>
                    <Text style={styles.service}>{item.service}</Text>
                </View>
            </View>
        </Animated.View>
      </Swipeable>);
}

const styles = {
    card: {
        justifyContent: "space-around",
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 17,
        backgroundColor: "#A64253",
        border: "1px solid black",
        color: "#fff",
        borderRadius: 5,
        width: "90%",
        alignItems: 'center',
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
        	width: 0,
        	height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    infoCard: {
        backgroundColor: "#D6A99A",
        flex: 1,
        color: "#fff",
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        alignItems:'center',
        justifyContent:'space-around',
        flexDirection: 'row'
    },
    deleteMenu: {
        backgroundColor: "red",
        justifyContent: "flex-end",
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        height: '100%',
        alignItems:'center'
    },
    addMenu: {
        backgroundColor: "green",
        justifyContent: "flex-end",
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        height: '100%',
        width: "30%",
        alignItems:'center',
        flex:1,
        borderRadius: 5
    },
    actionText: {
        color: 'white',
        fontSize: 16,
        backgroundColor: 'transparent',
        padding: 10,
    },
    action: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    service: {
        color: "#FEE7D1",
        fontSize: 15
    },

}
