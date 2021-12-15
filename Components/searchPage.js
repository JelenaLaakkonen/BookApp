import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, Image, TouchableNativeFeedback } from 'react-native';
import { SearchBar } from 'react-native-elements';
import styles from './Styles';

export default function searchPage({ navigation }) {

  const [input, setInput] = useState('');
  const [books, setBooks] = useState([]);
  const [resultAmount, setResultAmount] = useState('');

  // Runs everytime 'input' changes with 2s delay (delay makes sure that the 'input' is correct)
  // If 'input' is not empty all the books are fetched from the API with the 'input' keyword 
  useEffect(() => {
    const delay = setTimeout(() => {
      if (!input) {
        setBooks('');
      } else {
        console.log(input)
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
      }
    }, 200)
    return () => clearTimeout(delay)
  }, [input]);

  // Flatlist content
  const renderItem = ({ item }) => (
    <View style={styles.bookContainer}>
      <View>
        <TouchableNativeFeedback onPress={() => navigation.navigate('BookDetails', { link: item.selfLink })}>
          <Image
            style={styles.bookImage}
            source={item.volumeInfo.imageLinks === undefined ? require('../assets/searchImage.png') : { uri: item.volumeInfo.imageLinks.thumbnail }}
            resizeMode='contain'
            defaultSource={require('../assets/searchImage.png')}
          />
        </TouchableNativeFeedback>
      </View>
      <View>
        <TouchableNativeFeedback onPress={() => navigation.navigate('BookDetails', { link: item.selfLink })}>
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

  // Rendered if flatlist is empty
  const renderEmptyContainer = () => (
    <View style={styles.container}>
      <Text style={styles.searchTitle}>Search for books</Text>
      <View style={styles.container}>
        <Image
          style={{
            width: 300,
            height: 300,
          }}
          source={require('../assets/searchImage.png')}
        />
      </View>
    </View>
  )

  // Rendered before flatlist
  const renderListHeader = () => (
    <View>
      <Text style={{ color: 'grey', marginVertical: 10 }}>{books === '' ? '' : resultAmount}</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={input => setInput(input)}
        value={input}
        inputContainerStyle={styles.textInput}
        containerStyle={styles.inputView}
        placeholderTextColor="rgb(116, 144, 147)"
      />
      <FlatList
        ListHeaderComponent={renderListHeader}
        ItemSeparatorComponent={renderSeparator}
        style={{ marginLeft: "5%" }}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        data={books}
        ListEmptyComponent={renderEmptyContainer()}
      />
    </View>
  );
}