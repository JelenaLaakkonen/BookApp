import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';

export default function BookDetails({ route, navigation }) {

  const { link } = route.params;
  const [bookDetails, setBookDetails] = useState({info: ''});

  useEffect(() => {
    fetch(link)
      .then(response => response.json())
      .then(data => {
        setBookDetails({info: data.volumeInfo});
        console.log(bookDetails);
      })
      .catch((e) => console.error(e))
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Text>{bookDetails.info}</Text>
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
