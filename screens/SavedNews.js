import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Appbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import CardItem from '../components/CardItem';
import { useTheme } from '../context/Context';

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
    // !data.find((d)=>d.title===value.title) ? data.push(value) : data;
    const filtered = data.filter((news) => news.title !== value)

    try {
        const jsonValue = JSON.stringify(filtered)
        await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
        // saving error
        alert('Somthing went wrong with storing the data!');
    }
}

export default function SavedNews(props) {
    const focused = useIsFocused();

    const deleteHandler = async (value) => {
        await storeData(value)
    }

    const [savedNews, setSavedNews] = useState([]);
    useEffect(() => {
        getData().then((data) => setSavedNews(data))
    }, [focused, deleteHandler])

    const { theme } = useTheme()
    return (
        <View style={[styles.container, {backgroundColor: theme.colors.elevation.level1}]}>
            <Appbar.Header style={{backgroundColor: theme.colors.elevation.level5}}>
                <Appbar.Content title="Saved"></Appbar.Content>
            </Appbar.Header>

            <FlatList
                style={styles.flatList}
                data={savedNews}
                keyExtractor={(item) => item.title}
                renderItem={({ item }) => <CardItem
                    handleDelete={deleteHandler}
                    navigation={props.navigation}
                    content={item.content}
                    image_url={item.image_url}
                    title={item.title}
                />}
            ></FlatList>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flatList: {
        flex: 1,
        height: 'auto',
    }
});