import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, Image, ImageBackground, ScrollView, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from './Styles';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, push } from "firebase/database";
import firebaseConfig from './firebaseConfig';
import { userStore } from './UserReducer';

// Initialize Firebase
initializeApp(firebaseConfig);
const database = getDatabase();

export default function BookDetails({ route }) {

    const { link } = route.params;
    const [uid, setUid] = useState('');
    const [bookDetails, setBookDetails] = useState({});
    const [imageLink, setImageLink] = useState({});
    const [textShown, setTextShown] = useState(false);
    const [lengthMore, setLengthMore] = useState(false);
    const [selectedShelf, setSelectedShelf] = useState('read')
    const [description, setDescription] = useState('');
    const [exists, setExists] = useState(false);
    const [authors, setAuthors] = useState([]);

    // Get userId from UserStore and set it
    useEffect(() => {
        setUid(userStore.getState());
    }, []);

    // Fetch book from API and set data
    useEffect(() => {
        fetch(`${link}?key=AIzaSyAC_om6HN224gaJSHas_OVPDpuJEXwQj2U`)
            .then(response => response.json())
            .then(data => {
                setBookDetails(data.volumeInfo);
                setImageLink(data.volumeInfo.imageLinks)
                setAuthors(data.volumeInfo.authors.join(' & '));
                if (data.volumeInfo.description) {
                    setDescription(data.volumeInfo.description.replace(/\<[^>]*>?/gm, '').replace(/\&quot;/gm, ''))
                }
            })
            .catch((e) => console.error(e))
    }, []);

    // Wait for checkBook to finish and then add book if it's not in database
    const addBook = async () => {
        await checkBook();
        if (exists === false) {
            push(ref(database, uid + '/' + selectedShelf + '/'), {
                bookDetails, rating: ''
            });
        } else {
            Alert.alert('Book Is Already in the One Shelf');
        }
    };

    // Check if book is in database and setExist to true or false
    const checkBook = async () => {
        const readRef = ref(database, uid + '/' + selectedShelf + '/');
        onValue(readRef, (snapshot) => {
            snapshot.forEach((childSnap) => {
                if (childSnap.val().bookDetails.title === bookDetails.title) {
                    setExists(true);
                } else {
                    setExists(false);
                }
            })
        })
    }

    // To toggle the show text or hide it
    const toggleNumberOfLines = () => {
        setTextShown(!textShown);
    }

    // To check the text is more than 4 lines or not
    const onTextLayout = useCallback(e => {
        setLengthMore(e.nativeEvent.lines.length >= 4);
    }, []);

    return (
        <View style={styles.detailsContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <ImageBackground source={imageLink === undefined ? require('../assets/searchImage.png') : { uri: imageLink.smallThumbnail }} style={styles.detailsImageContainer} blurRadius={10}>
                    <Image
                        style={styles.detailsBookImage}
                        source={imageLink === undefined ? require('../assets/searchImage.png') : { uri: imageLink.smallThumbnail }}
                        resizeMode='contain'
                    />
                </ImageBackground>
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}>{bookDetails.title}</Text>
                    <Text style={styles.detailsAuthor}>by {authors}</Text>
                    <Text style={styles.detailsHeader}>Book description</Text>
                    <Text
                        onTextLayout={onTextLayout}
                        numberOfLines={textShown ? undefined : 4}
                        style={styles.detailsDescription}>{description}</Text>
                    {
                        lengthMore ? <Text
                            onPress={toggleNumberOfLines}
                            style={styles.descriptionMore}>{textShown ? 'Read less...' : 'Read more...'}</Text>
                            : null
                    }
                </View>
                <View style={styles.pickerContainer}>
                    <Picker
                        style={styles.picker}
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
                        color='rgb(116, 144, 147)'
                        title='ADD BOOK TO SHELF'
                    />
                </View>
                <Text style={styles.additionalInfo}>- {bookDetails.pageCount} pages - First published {bookDetails.publishedDate} - Publisher {bookDetails.publisher}</Text>
            </ScrollView>
        </View >

    );
}