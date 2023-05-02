import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import NewsOverviewScreen from '../screens/NewsOverviewScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function Navigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
            // screenOptions={{headerShown: false}}
            // initialRouteName='NewsOverviewScreen'
            >
                <Stack.Screen
                    options={{ headerShown: false }}
                    name="HomeScreen"
                    component={HomeScreen} />
                <Stack.Screen
                    name="NewsOverviewScreen"
                    component={NewsOverviewScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}