import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StateContext, DispatchContext, initialState } from './context/context';
import reducer from './reducers/reducer'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import QueueScreen from './QueueScreen';
import SearchScreen from './searchScreen';

const MainNavigator = createStackNavigator(
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

export default function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
          <AppContainer />
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

