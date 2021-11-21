import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Image } from 'react-native';

export default function searchPage() {

const [input, setInput] = useState('');
const [books, setBooks] = useState([]);

const getBooks = (input) => {
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${input}`)
  .then(response => response.json())
  .then(data => { 
    setBooks(data.items);
  })
  .catch((error) => {
    Alert.alert('Error',  error);
   });
  }

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.volumeInfo.title}</Text>
    </View>
  )

  return (
    <View style={styles.container}>
        <FlatList 
          style={{marginLeft: "5%"}}
          keyExtractor={item => item.id}
          renderItem={renderItem} 
          data={books}
        />
        <TextInput
          style={{fontSize: 18, width:200, borderWidth: 1}}
          value={input}
          placeholder="Type search word" 
          onChangeText={input => setInput(input)}
        />
        <Button 
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
    padding: 10,
    margin: 12,
  },
});
