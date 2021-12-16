import React, { useState, useEffect } from 'react';
import { Text, View, Button, FlatList, Image, Alert } from 'react-native';
import styles from './Styles';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, remove, update, get } from "firebase/database";
import firebaseConfig from './firebaseConfig';
import { userStore } from './UserReducer';
import { AirbnbRating } from 'react-native-ratings';

// Initialize Firebase
initializeApp(firebaseConfig);
const database = getDatabase();

export default function Bookshelf() {

  const [uid, setUid] = useState('');
  const [items, setItems] = useState([]);

  // Get userId from UserStore and set it
  useEffect(() => {
    setUid(userStore.getState());
  }, []);

  // Get and set books from database
  useEffect(() => {
    const itemsRef = ref(database, uid + '/read/')
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data === null) {
        setItems([])
      } else {
        setItems(Object.values(data));
      }
    })
  }, [uid]);

  // Removes one book from database
  const deleteItem = (bookDetails) => {
    Alert.alert(
      'Remove book from shelf?',
      'Remove will be permanent',
      [
        { text: 'NO', onPress: () => console.log("Cancel Pressed"), style: 'cancel' },
        {
          text: 'YES', onPress: () => {
            const readRef = ref(database, uid + '/read/');
            onValue(readRef, (snapshot) => {
              snapshot.forEach((childSnap) => {
                if (childSnap.val().bookDetails.title === bookDetails.title) {
                  const deleteRef = ref(database, uid + '/read/' + childSnap.key);
                  remove(deleteRef);
                }
              })
            })
          }
        },
      ]
    )
  }

  // Adds rating to book
  const addRating = (rating, bookDetails) => {
    console.log(rating)
    const readRef = ref(database, uid + '/read/');
    get(readRef).then((snapshot) => {
      snapshot.forEach((childSnap) => {
        if (childSnap.val().bookDetails.title === bookDetails.title) {
          update(ref(database, uid + '/read/' + childSnap.key + '/rating'), {
            rating
          })
        }
      })
    })
  }

  // Flatlist content
  const renderItem = ({ item }) => (
    <View style={styles.bookContainer}>
      <View>
        <Image
          style={styles.bookImage}
          source={item.bookDetails.imageLinks === undefined ? require('../assets/searchImage.png') : { uri: item.bookDetails.imageLinks.smallThumbnail }}
          resizeMode='contain'
        />
      </View>
      <View>
        <Text style={styles.readTitle}>{item.bookDetails.title}</Text>
        <Text style={styles.author}>by {item.bookDetails.authors}</Text>
        <View style={styles.rating}>
          <AirbnbRating
            reviews={['']}
            selectedColor="rgb(225, 161, 3)"
            size={30}
            defaultRating={item.rating === '' ? 0 : item.rating.rating}
            onFinishRating={(rating) => addRating(rating, item.bookDetails)}
          />
        </View>
        <View style={styles.readButton}>
          <Button onPress={() => deleteItem(item.bookDetails)}
            color="rgb(116, 144, 147)"
            title="Remove Book"
          />
        </View>
      </View>
    </View>
  )

  // Flatlist item seperator
  const renderSeparator = () => (
    <View
      style={{
        backgroundColor: 'lightgrey',
        height: 0.5,
      }}
    />
  )

  // Rendered if flatlist is empty
  const renderEmptyContainer = () => (
    <View style={styles.container}>
      <Image
        style={{
          width: 250,
          height: 250,
          marginTop: 130,
        }}
        source={require('../assets/searchImage.png')}
      />
      <Text style={styles.emptyTitle}>Your Bookshelf is empty :(</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <FlatList
        ItemSeparatorComponent={renderSeparator}
        style={{ marginLeft: "5%" }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        data={items}
        ListEmptyComponent={renderEmptyContainer()}
      />
    </View>
  );
}