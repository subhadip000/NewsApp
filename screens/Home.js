import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useState } from 'react'
import { useTheme, Appbar, Chip, Button, ActivityIndicator, MD2Colors, ProgressBar } from 'react-native-paper';
import CardItem from '../components/CardItem';

const categories = ["Business", "Entertainment", "Environment", "Food", "Health",
    "Politics", "Science", "Sports", "Technology", "Tourism", "Top"];

const API_KEY = "pub_2104898db410596e2c2bfe1440d0cf1d69731";

export default function Home({ navigation }) {
    const [newsData, setNewsData] = useState([]);
    const [selectedCat, setSelectedCat] = useState([]);
    const [nextPage, setNextPage] = useState("");
    const [showFilter, setShowFilter] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const haldleSelect = (val) => {
        setSelectedCat((prev) =>
            prev.find((p) => p === val)
                ? prev.filter((e) => e !== val)
                : [...prev, val]
        )
    }

    const handlePress = async () => {
        URL = `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=in&language=en${selectedCat.length > 0
            ? `&category=${selectedCat.join()}`
            : ''}${nextPage?.length > 0 ? `&page=${nextPage}` : ''}`;
        try {
            setIsLoading(true)
            await fetch(URL)
                .then((res) => res.json())
                .then((data) => {
                    setNewsData((prev) => [...prev, ...data.results])
                    setNextPage(data.nextPage)
                });
            setIsLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.Content title="Home"></Appbar.Content>
            </Appbar.Header>
            <Button
                icon="filter"
                onPress={() => setShowFilter(!showFilter)}>
                Filter
            </Button>
            {showFilter ? <View style={styles.filterContainer}>
                {categories.map((e) => <Chip
                    key={e}
                    mode='outlined'
                    style={styles.chipItem}
                    showSelectedOverlay
                    selected={selectedCat.find((c) => e === c) ? true : false}
                    onPress={() => haldleSelect(e)}
                >{e}</Chip>
                )}
                <Button
                    labelStyle={{ fontSize: 14, margin: 'auto' }}
                    style={styles.button}
                    icon={"sync"}
                    onPress={handlePress}
                >
                    Refresh
                </Button>
            </View> : ''}

            <ProgressBar
                visible={isLoading}
                indeterminate
                color={MD2Colors.violet800} />
            <FlatList
                keyExtractor={(item) => item.title}
                onEndReached={() => handlePress()}
                style={styles.flatList}
                data={newsData}
                renderItem={({ item }) => <CardItem
                    navigation={navigation}
                    category={item.category}
                    content={item.content}
                    description={item.description}
                    image_url={item.image_url}
                    pubDate={item.pubDate}
                    title={item.title}
                    source_id={item.source_id}
                />}
            ></FlatList>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    filterContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 10,
    },
    chipItem: {
        margin: 3,
        // textTransform: 'capitalize',
    },
    button: {
        maxWidth: 400,
        padding: 0,
        maxHeight: 40,
    },
    flatList: {
        flex: 1,
        height: 'auto',
    }
});