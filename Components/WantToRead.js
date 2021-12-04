import React, { useState, useEffect } from 'react';
import { Text, View, Button, FlatList, StyleSheet, Image } from 'react-native';
import styles from './Styles';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, remove } from "firebase/database";
import firebaseConfig from './firebaseConfig';

initializeApp(firebaseConfig);
const database = getDatabase();

export default function WantToRead() {

  const [items, setItems] = useState([]);

  useEffect(() => {
    const itemsRef = ref(database, 'wantToRead/')
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data === null) {
      } else {
        setItems(Object.values(data));
      }
    })
  }, []);

  const deleteItem = (bookDetails) => {
    const key = Object.keys(items)[10];
    console.log(key);
    remove(ref(database, 'wantToRead/'+key), {
      bookDetails
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.bookContainer}>
      <View>
        <Image
          style={styles.bookImage}
          source={{ uri: item.bookDetails.imageLinks.smallThumbnail }}
          resizeMode='contain'
        />
      </View>
      <View>
        <Text style={styles.title}>{item.bookDetails.title}</Text>
        <Text style={styles.author}>by {item.bookDetails.authors}</Text>
        <View style={styles.button}>
          <Button onPress={() => deleteItem(item.bookDetails)}
            color="rgb(116, 144, 147)"
            title="Remove Book"
          />
        </View>
      </View>
    </View>
  )

  const renderSeparator = () => (
    <View
      style={{
        backgroundColor: 'lightgrey',
        height: 0.5,
      }}
    />
  )

  const renderEmptyContainer = () => (
    <View style={styles.container}>
      <Text style={styles.title}>Your Bookshelf is empty :(</Text>
      <Image
        style={{
          width: 250,
          height: 200,
        }}
        source={require('../assets/searchImage.png')}
      />
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

const styles3 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 30,
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
    padding: 8,
    backgroundColor: '#fff',
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#fff',
    fontSize: 30,
  },
  buttonContainer1: {
    flex: 4,
    width: 200,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    color: 'rgb(136, 136, 250)',
  },
  textInput: {
    fontSize: 30,

  },
  textContainer: {
    fontSize: 30,

  },
  textContainerSmall: {
    fontSize: 20,
    padding: 20,
  },
});