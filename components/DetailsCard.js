import { Dimensions, ScrollView, View } from 'react-native'
import React from 'react'
import { Card, Text, useTheme } from 'react-native-paper'

export default function DetailsCard(props) {
    const theme = useTheme();

    return (
        <ScrollView>
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text variant="titleMedium" style={{ color: 'black', margin: 10 }}>{props.source_id}</Text>
                <Text variant="titleMedium" style={{ color: 'black', margin: 10 }}>{props.pubDate}</Text>
            </View>
            <Text
                style={{ color: 'black', margin: 10 }}
                variant='headlineMedium'
            >{props.title}</Text>
            <Card
                style={{ backgroundColor: theme.colors.background }}
                contentStyle={{ width: Dimensions.get('window').width }}
            >
                {props.image_url && (<Card.Cover source={{ uri: props.image_url }}></Card.Cover>)}
                <Card.Content>
                    <Text
                        style={{ textAlign: 'left', marginVertical: 10 }}
                        variant="headlineSmall"
                        textBreakStrategy='highQuality'>
                        {props.content}
                    </Text>
                </Card.Content>
            </Card>
        </ScrollView>
    )
}