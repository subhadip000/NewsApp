import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './navigation/Navigator';
import { DefaultTheme, Provider } from 'react-native-paper';
import ThemeProvider from './context/Context';

export default function App() {



  return (
    <ThemeProvider>
      <Navigator />
    </ThemeProvider>
  );
}
