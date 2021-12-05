import React, { useState } from 'react';
import { Text, View, TextInput, Button, FlatList, Image, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import styles from './Styles';

export default function searchPage({ navigation }) {

  const [input, setInput] = useState('');
  const [books, setBooks] = useState([]);
  const [bookDetails, setBookDetails] = useState({});
  const [resultAmount, setResultAmount] = useState('');

  const getBooks = (input) => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${input}&maxResults=40&key=AIzaSyAC_om6HN224gaJSHas_OVPDpuJEXwQj2U`)
      .then(response => response.json())
      .then(data => {
        setBooks(data.items);
        const numToString = data.totalItems.toString();
        setResultAmount(numToString + ' results for "' + input + '"');
      })
      .catch((err) => {
        console.error('Error', err);
      });
  };

  const renderItem = ({ item }) => (
    <View style={styles.bookContainer}>
      <View>
        <TouchableNativeFeedback onPress={() => navigation.navigate('BookDetails', { link: item.selfLink })}>
          <Image
            style={styles.bookImage}
            source={{ uri: item.volumeInfo.imageLinks.smallThumbnail }}
            resizeMode='contain'
          />
        </TouchableNativeFeedback>
      </View>
      <View>
        <TouchableNativeFeedback onPress={() => navigation.navigate('BookDetails', { link: item.selfLink })}>
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

  const renderEmptyContainer = () => (
    <View style={styles.container}>
      <Text style={styles.searchTitle}>Search for books</Text>
      <Image
        style={{
          width: 250,
          height: 200,
          marginTop: 80
        }}
        source={require('../assets/searchImage.png')}
      />
    </View>
  )

  const renderListHeader = () => (
    <View>
      <Text>{resultAmount}</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={renderListHeader}
        ItemSeparatorComponent={renderSeparator}
        style={{ marginLeft: "5%" }}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        data={books}
        ListEmptyComponent={renderEmptyContainer()}
      />
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          value={input}
          placeholder="Type search word"
          onChangeText={input => setInput(input)}
        />
      </View>
      <TouchableOpacity style={styles.searchButton} onPress={() => getBooks(input)}>
        <Text>SEARCH</Text>
      </TouchableOpacity>
    </View>
  );
}