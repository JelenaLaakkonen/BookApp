import React, { useState } from 'react';
import { Text, View, TextInput, Button, FlatList, Image, TouchableNativeFeedback, ScrollView } from 'react-native';
import styles from './Styles';

export default function booksheves({ navigation }) {

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.shelvesTitle}>SHELVES</Text>
                <View style={styles.bookshelfContainer}>
                    <TouchableNativeFeedback onPress={() => navigation.navigate('Want to Read')}>
                        <Image
                            style={{
                                width: 140,
                                height: 140,
                                marginTop: 5,
                                marginLeft: 35
                            }}
                            source={require('../assets/wantToRead.png')}
                        />
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={() => navigation.navigate('Want to Read')}>
                        <Text style={styles.shelfTitle}>Want to Read</Text>
                    </TouchableNativeFeedback>
                </View>


                <View style={styles.bookshelfContainer}>
                    <TouchableNativeFeedback onPress={() => navigation.navigate('Currently Reading')}>
                        <Image
                            style={{
                                width: 160,
                                height: 140,
                                marginTop: 5,
                                marginLeft: 50
                            }}
                            source={require('../assets/reading.png')}
                        />
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={() => navigation.navigate('Currently Reading')}>
                        <Text style={styles.shelfTitle}>Currently Reading</Text>
                    </TouchableNativeFeedback>
                </View>
                <View style={styles.bookshelfContainer}>
                    <TouchableNativeFeedback onPress={() => navigation.navigate('Read')}>
                        <Image
                            style={{
                                width: 160,
                                height: 150,
                                marginTop: 5
                            }}
                            source={require('../assets/read.png')}
                        />
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={() => navigation.navigate('Read')}>
                        <Text style={styles.shelfTitle}>Read</Text>
                    </TouchableNativeFeedback>
                </View>
            </View>
        </ScrollView >
    );
}