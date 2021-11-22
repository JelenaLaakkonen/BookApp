import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Image, TouchableNativeFeedback } from 'react-native';
import { LongPressGestureHandler } from 'react-native-gesture-handler';
import Bookshelf from './Bookshelf';

export default function searchPage( {navigation} ) {

  const [input, setInput] = useState('');
  const [books, setBooks] = useState([]);

  const getBooks = (input) => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${input}`)
      .then(response => response.json())
      .then(data => {
        setBooks(data.items);
      })
      .catch((err) => {
        console.error('Error', err);
      });
  }

  const pressed = () => {
    console.log('hi');
  } 

  const renderItem = ({ item }) => (
    <View style={styles.bookContainer}>
      <View>
        <Image
          style={styles.bookImage}
          source={{ uri: item.volumeInfo.imageLinks.smallThumbnail }}
          resizeMode='contain'
        />
      </View>
      <View>
        <TouchableNativeFeedback style={{ flex: 0.5, borderColor: "black", borderWidth: 1 }} onPress={() => navigation.navigate('BookDetails')}>
            <Text style={styles.title}>{item.volumeInfo.title}</Text>
        </TouchableNativeFeedback>
        <Text style={styles.author}>by {item.volumeInfo.authors}</Text>
      </View>
    </View >
  )

  const renderSeparator = () => (
    <View
      style={{
        backgroundColor: 'lightgrey',
        height: 0.5,
      }}
    />
  )

  return (
    <View style={styles.container}>
      <FlatList
        ItemSeparatorComponent={renderSeparator}
        style={{ marginLeft: "5%" }}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        data={books}
      />
      <TextInput
        style={{ fontSize: 18, width: 200, borderWidth: 1 }}
        value={input}
        placeholder="Type search word"
        onChangeText={input => setInput(input)}
      />
      <Button
        style={styles.button}
        title="Find"
        onPress={() => getBooks(input)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    alignItems: 'center',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    fontSize: 20
  },
  author: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    marginBottom: 10
  },
  button: {
    margin: 10,
    padding: 10
  },
  bookImage: {
    height: 100,
    width: 100
  },
  bookContainer: {
    flexDirection: 'row',
    padding: 10
  }
});
