import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, Picker } from 'react-native';

export default function BookDetails({ route, navigation }) {

    const { link } = route.params;
    const [bookDetails, setBookDetails] = useState({});
    const [selectedValue, setSelectedValue] = useState('');

    useEffect(() => {
        fetch(`${link}?key=AIzaSyAC_om6HN224gaJSHas_OVPDpuJEXwQj2U`)
            .then(response => response.json())
            .then(data => {
                console.log(data.volumeInfo);
                setBookDetails(data.volumeInfo);
            })
            .catch((e) => console.error(e))
    }, []);

    return (
        <View style={{ flex: 1, padding: 24 }}>
            <Text>{bookDetails.title}</Text>
            <Text>{bookDetails.authors}</Text>
            {/*<FlatList
                data={bookDetails}
                renderItem={renderItem}
                keyExtractor={((item, index) => index.toString())}
            />*/}
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
