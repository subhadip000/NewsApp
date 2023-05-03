import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { Button, Card } from 'react-native-paper'
import { useTheme } from '../context/Context';

export default function CardItem(props) {

  const {theme} = useTheme();
  // console.log("theme call", theme);
  // console.log(props.image_url);
  const handlePress = () => {
    props.navigation.navigate('NewsOverviewScreen', {
      title: props.title,
      description: props.description,
      image_url: props.image_url,
      pubDate: props.pubDate,
      source_id: props.source_id,
      content: props.content,
    })
  }
  return (
    <Pressable onPress={handlePress} >
      <Card style={{ marginVertical: 10, backgroundColor: theme.colors.elevation.level5 }}>
        <Card.Cover borderRadius={10} source={{ uri: props.image_url }} />
        <Card.Title
          title={props.title}
        // subtitle={props.description ? props.description.split('\n')[0] : ''}
        ></Card.Title>
        {props.handleDelete && (<Card.Actions>
          <Button onPress={() => props.handleDelete(props.title)}>Remove</Button>
        </Card.Actions>)}
      </Card>
    </Pressable>
  )
}

const styles = StyleSheet.create({

});