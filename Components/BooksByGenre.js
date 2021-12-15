import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, Image, TouchableNativeFeedback } from 'react-native';
import styles from './Styles';

export default function BooksByGenre({ route, navigation }) {

    const { category } = route.params;
    const [books, setBooks] = useState([]);
    const [resultAmount, setResultAmount] = useState('');

    // Fetch books from API by genre
    useEffect(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=%27%27+subject:${category}&maxResults=40&key=AIzaSyAC_om6HN224gaJSHas_OVPDpuJEXwQj2U`)
            .then(response => response.json())
            .then(data => {
                setBooks(data.items);
                const numToString = data.totalItems.toString();
                setResultAmount(numToString + ' results for "' + category + '"');
            })
            .catch((err) => {
                console.error('Error', err);
            });
    }, [category]);

    // Flatlist content
    const renderItem = ({ item }) => (
        <View style={styles.bookContainer}>
            <View>
                <TouchableNativeFeedback onPress={() => navigation.navigate('BookDetailsGenre', { link: item.selfLink })}>
                    <Image
                        style={styles.bookImage}
                        source={item.volumeInfo.imageLinks === undefined ? require('../assets/searchImage.png') : { uri: item.volumeInfo.imageLinks.thumbnail }}
                        resizeMode='contain'
                        defaultSource={require('../assets/searchImage.png')}
                    />
                </TouchableNativeFeedback>
            </View>
            <View>
                <TouchableNativeFeedback onPress={() => navigation.navigate('BookDetailsGenre', { link: item.selfLink })}>
                    <Text style={styles.title}>{item.volumeInfo.title}</Text>
                </TouchableNativeFeedback>
                <Text style={styles.author}>by {item.volumeInfo.authors === undefined ? 'unknown' : item.volumeInfo.authors.join(' & ')}</Text>
            </View>
        </View >
    )

    // Flatlist item seperator
    const renderSeparator = () => (
        <View
            style={{
                backgroundColor: 'rgb(116, 144, 147)',
                height: 1,
            }}
        />
    )

    // Rendered before flatlist
    const renderListHeader = () => (
        <View>
            <Text style={{ color: 'grey', marginVertical: 10 }}>{books === '' ? '' : resultAmount}</Text>
        </View>
    )

    return (
        <View style={styles.container}>
            <FlatList
                ListHeaderComponent={renderListHeader}
                ItemSeparatorComponent={renderSeparator}
                style={{ marginLeft: "5%" }}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                data={books}
            />
        </View>
    );
}