import React, { useState } from 'react';
import { Text, View, TextInput, Button, FlatList, Image, TouchableNativeFeedback } from 'react-native';
import styles from './Styles';

export default function searchPage({ navigation }) {

  const [input, setInput] = useState('');
  const [books, setBooks] = useState([]);
  const [resultAmount, setResultAmount] = useState();

  const getBooks = (input) => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${input}&key=AIzaSyAC_om6HN224gaJSHas_OVPDpuJEXwQj2U`)
      .then(response => response.json())
      .then(data => {
        setBooks(data.items);
        setResultAmount(data.totalItems);
      })
      .catch((err) => {
        console.error('Error', err);
      });
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
      <Text style={styles.title}>Search and find new worlds</Text>
      <Image
        style={{
          width: 250,
          height: 200,
        }}
        source={require('../assets/searchImage.png')}
      />
    </View>
  )

  const renderListHeader = () => (
    <View>
      <Text>{resultAmount} results for "{input}"</Text>
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