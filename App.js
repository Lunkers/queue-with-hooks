import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StateContext, DispatchContext, initialState } from './context/context';
import reducer from './reducers/reducer'
import { createAppContainer } from 'react-navigation';
import QueueScreen from './QueueScreen';
import SearchScreen from './searchScreen';
import { createBottomTabNavigator} from 'react-navigation-tabs'
import FlashMessage from 'react-native-flash-message';


const MainNavigator = createBottomTabNavigator(
  {
    Queue: QueueScreen,
    Search: SearchScreen,
  },
  {
    initialRouteName: 'Queue',
    transitionConfig : () => ({
      transitionSpec: {
        duration: 0,
      },
    }),
  }
)

const AppContainer = createAppContainer(MainNavigator);
//disablea varningar
console.disableYellowBox = true;

export default function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
          <AppContainer style={styles.container}/>
          <FlashMessage position="top"/>
      </StateContext.Provider>
    </DispatchContext.Provider>
    
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#634B66',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

