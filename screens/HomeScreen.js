import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Home from './Home'
import SavedNews from './SavedNews'

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ size, color }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } 
          else if (route.name === 'Saved') {
            iconName = 'bookmarks';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        // tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Saved" component={SavedNews} />
    </Tab.Navigator>
  );
}