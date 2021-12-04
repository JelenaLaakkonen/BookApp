import React, { useState } from 'react';
import { Text, View, TextInput, Button, FlatList, Image, TouchableNativeFeedback } from 'react-native';
import styles from './Styles';

export default function booksheves({ navigation }) {

    return (
        <View style={styles.container}>
            <View>
                <Text>Shelves</Text>
                <TouchableNativeFeedback onPress={() => navigation.navigate('Read')}>
                    <Text style={styles.title}>Read</Text>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={() => navigation.navigate('Currently Reading')}>
                    <Text style={styles.title}>Currently Reading</Text>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={() => navigation.navigate('Want to Read')}>
                    <Text style={styles.title}>Want to Read</Text>
                </TouchableNativeFeedback>
            </View>
        </View >
    );
}