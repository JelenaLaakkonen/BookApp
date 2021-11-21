import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Bookshelf() {

  return (
    <View style={styles.container}>
        <Text>Bookshelf</Text>
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
