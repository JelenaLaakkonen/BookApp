import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import styles from './Styles';
import { ListItem, Avatar } from 'react-native-elements'
import avatars from './avatars';

export default function Home({ navigation }) {

    // List data
    const list = [
        {
            genre: 'Fiction',
            icon: avatars.fiction
        },
        {
            genre: 'Poetry',
            icon: avatars.poetry
        },
        {
            genre: 'Historical',
            icon: avatars.history
        },
        {
            genre: 'Adventure',
            icon: avatars.adventure
        },
        {
            genre: 'Crime',
            icon: avatars.crime
        },
        {
            genre: 'Fantasy',
            icon: avatars.fantasy
        },
        {
            genre: 'Horror',
            icon: avatars.horror
        },
        {
            genre: 'Romance',
            icon: avatars.romance
        },
        {
            genre: 'Thriller',
            icon: avatars.thriller
        },
        {
            genre: 'Art',
            icon: avatars.art
        }
    ];

    return (
        <ScrollView>
            <View style={styles.homeContainer}>
                <Text style={styles.homeTitle}>Search Some of Our Favorite Genres</Text>
                <View>
                    {
                        list.map((l, i) => (
                            <ListItem key={i} bottomDivider onPress={() => navigation.navigate('Genre Search', { category: l.genre })}>
                                <Avatar source={l.icon} size={55} />
                                <ListItem.Content>
                                    <ListItem.Title>{l.genre}</ListItem.Title>
                                </ListItem.Content>
                            </ListItem>
                        ))
                    }
                </View>
            </View>
        </ScrollView>
    );
}