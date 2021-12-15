import React from 'react';
import { Text, View, Image, TouchableNativeFeedback, ScrollView } from 'react-native';
import styles from './Styles';

export default function booksheves({ navigation }) {

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.shelvesTitle}>YOUR SHELVES</Text>
                <View style={styles.bookshelfContainer}>
                    <TouchableNativeFeedback onPress={() => navigation.navigate('Want to Read')}>
                        <Image
                            style={{
                                width: 130,
                                height: 130,
                                marginLeft: 40,
                                marginVertical: 15,
                                marginHorizontal: 10
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
                                width: 130,
                                height: 130,
                                marginVertical: 15,
                                marginHorizontal: 10
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
                                width: 130,
                                height: 130,
                                marginLeft: -20,
                                marginVertical: 15,
                                marginHorizontal: 10
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