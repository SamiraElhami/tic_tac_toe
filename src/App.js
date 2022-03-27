import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

import Game from './screens/Game';
import ChooseGame from './screens/ChooseGame';
import Score from './screens/Score';

const Tab = createMaterialBottomTabNavigator();

function TicTabs() {
  return (
    <Tab.Navigator
       initialRouteName="Game"
        shifting={true}
        sceneAnimationEnabled={true}
        activeColor="lightgrey"
        inactiveColor="gray"
        barStyle={{ backgroundColor: 'black' }}
    >
     <Tab.Screen
        name="Notifications"
        component={Score}
        options={{
          tabBarLabel: 'Score',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="scoreboard" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Game"
        component={Game}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="ChooseGame"
        component={ChooseGame}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

class App extends React.Component {
render() {

  return (
    <NavigationContainer>
      <TicTabs />
    </NavigationContainer>

  );
}

}

export default App;
