import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import DetailsCard from '../components/DetailsCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@storage_Key')
    if (value !== null) {
      // value previously stored
      return JSON.parse(value);
    }
  } catch (e) {
    // error reading value
    alert('Somthing wnt wrong with getting the data!');
    return;
  }
}

const storeData = async (value) => {
  const data = await getData() || [];
  !data.find((d)=>d.title===value.title) ? data.push(value) : data;
  try {
    const jsonValue = JSON.stringify(data)
    await AsyncStorage.setItem('@storage_Key', jsonValue)
  } catch (e) {
    // saving error
    alert('Somthing went wrong with storing the data!');
  }
}


export default function NewsOverviewScreen({ navigation, route }) {
  const { title, description, image_url, pubDate, source_id, content } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => storeData({title, image_url, content})}>Save</Button>
      ),
    });
  }, [navigation]);

  return (
    <DetailsCard
      title={title}
      description={description}
      image_url={image_url}
      pubDate={pubDate}
      source_id={source_id}
      content={content}
    />
  );
}
