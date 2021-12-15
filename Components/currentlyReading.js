import React, { useState, useEffect } from 'react';
import { Text, View, Button, FlatList, Image, Alert } from 'react-native';
import styles from './Styles';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, remove } from "firebase/database";
import firebaseConfig from './firebaseConfig';
import { userStore } from './UserReducer';

// Initialize Firebase
initializeApp(firebaseConfig);
const database = getDatabase();

export default function currentlyReading() {

  const [uid, setUid] = useState('');
  const [items, setItems] = useState([]);

  // Get userId from UserStore and set it
  useEffect(() => {
    setUid(userStore.getState());
  });

  // Get and set books from database
  useEffect(() => {
    const itemsRef = ref(database, uid + '/currentlyReading/')
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
            const readRef = ref(database, uid + '/currentlyReading/');
            onValue(readRef, (snapshot) => {
              snapshot.forEach((childSnap) => {
                if (childSnap.val().bookDetails.title === bookDetails.title) {
                  const deleteRef = ref(database, uid + '/currentlyReading/' + childSnap.key);
                  console.log(deleteRef);
                  remove(deleteRef);
                }
              })
            })
          }
        },
      ]
    )
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
        <Text style={styles.title}>{item.bookDetails.title}</Text>
        <Text style={styles.author}>by {item.bookDetails.authors}</Text>
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