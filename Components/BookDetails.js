import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from './Styles';
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref } from "firebase/database";
import firebaseConfig from './firebaseConfig';
import { userStore } from './UserReducer';

// Initialize Firebase
initializeApp(firebaseConfig);
const database = getDatabase();

export default function BookDetails({ route, navigation }) {
    
    useEffect(() => {
        setUid(userStore.getState());
    });

    const [uid, setUid] = useState('');
    const { link } = route.params;
    const [bookDetails, setBookDetails] = useState({});
    const [imageLink, setImageLink] = useState({});
    const [textShown, setTextShown] = useState(false); //To show ur remaining Text
    const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
    const [buttonColor, setButtonColor] = useState('rgb(116, 144, 147)');
    const [buttonText, setButtonText] = useState('Add book to shelf');
    const [selectedShelf, setSelectedShelf] = useState('read')

    const addBook = () => {
        console.log(selectedShelf);
        push(ref(database, uid + '/' + selectedShelf + '/'), {
            bookDetails
        });
        setButtonColor('grey')
        setButtonText('In bookshelf')
        //TODO: if text == in bookshelf -- remove
    };

    useEffect(() => {
        fetch(`${link}?key=AIzaSyAC_om6HN224gaJSHas_OVPDpuJEXwQj2U`)
            .then(response => response.json())
            .then(data => {
                setBookDetails(data.volumeInfo);
                setImageLink(data.volumeInfo.imageLinks)
            })
            .catch((e) => console.error(e))
    }, []);

    const toggleNumberOfLines = () => { //To toggle the show text or hide it
        setTextShown(!textShown);
    }

    const onTextLayout = useCallback(e => {
        setLengthMore(e.nativeEvent.lines.length >= 4); //to check the text is more than 4 lines or not
        // console.log(e.nativeEvent);
    }, []);

    return (

        <View style={styles2.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <ImageBackground source={{ uri: imageLink.smallThumbnail }} style={styles2.imageContainer} blurRadius={10}>
                    <Image
                        style={styles2.bookImage}
                        source={{ uri: imageLink.smallThumbnail }}
                        resizeMode='contain'
                    />
                </ImageBackground>
                <View style={styles2.container}>
                    <Text style={styles2.title}>{bookDetails.title}</Text>
                    <Text style={styles2.author}>by {bookDetails.authors}</Text>
                    <Text style={styles2.header}>Book description</Text>
                    <Text
                        onTextLayout={onTextLayout}
                        numberOfLines={textShown ? undefined : 4}
                        style={styles2.description}>{bookDetails.description}</Text>
                    {
                        lengthMore ? <Text
                            onPress={toggleNumberOfLines}
                            style={styles.descriptionMore}>{textShown ? 'Read less...' : 'Read more...'}</Text>
                            : null
                    }
                </View>
                <View style={styles2.pickerContainer}>
                    <Picker
                        style={styles2.picker}
                        selectedValue={selectedShelf}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedShelf(itemValue)
                        }>
                        <Picker.Item label="Read" value="read" />
                        <Picker.Item label="Currently Reading" value="currentlyReading" />
                        <Picker.Item label="Want to Read" value="wantToRead" />
                    </Picker>
                </View>
                <View style={styles.button}>
                    <Button
                        onPress={addBook}
                        color={buttonColor}
                        title={buttonText}
                    />
                </View>
                <Text style={styles2.additionalInfo}>- {bookDetails.pageCount} pages - First published {bookDetails.publishedDate} - Publisher {bookDetails.publisher}</Text>
            </ScrollView>
        </View >

    );
}

const styles2 = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    picker: {
        width: 200,
        color: 'white',
        backgroundColor: 'rgb(116, 144, 147)'
    },
    pickerContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        width: '100%',
    },
    title: {
        fontFamily: 'serif',
        marginTop: 10,
        marginBottom: 5,
        fontSize: 20,
        marginRight: -10,
    },
    additionalInfo: {
        fontFamily: 'serif',
        marginTop: 10,
        marginBottom: 5,
        textAlign: 'center',
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1,
        borderTopColor: 'lightgrey',
        borderTopWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 30
    },
    header: {
        fontFamily: 'serif',
        marginTop: 10,
        marginBottom: 5,
        fontSize: 20,
        marginRight: -10,
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 2,
    },
    author: {
        fontFamily: 'serif',
        alignItems: 'center',
        paddingLeft: 10,
        marginBottom: 10,
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1,
    },
    description: {
        fontFamily: 'serif',
        alignItems: 'center',
        paddingHorizontal: 30,
        lineHeight: 21
    },
    descriptionMore: {
        fontFamily: 'serif',
        alignItems: 'center',
        paddingHorizontal: 30,
        lineHeight: 21,
        marginTop: 10
    },
    bookImage: {
        flex: 1,
        marginVertical: 8,
        height: 220,
        width: 220,
        alignItems: 'center',
    },
});
