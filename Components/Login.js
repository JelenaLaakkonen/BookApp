
import React, { useState } from "react";
import { StyleSheet, Alert, Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { signIn, store } from './SigninReducer';
import firebaseConfig from './firebaseConfig';

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //await firebase.auth().signInWithEmailAndPassword(email, password)
    const onLogin = async () => {
        try {
            if (email !== '' && password !== '') {
                let response = await signInWithEmailAndPassword(auth, email, password);
                if (response) {
                    console.log(response)
                    store.dispatch(signIn(true))
                } else {
                    store.dispatch(signIn(false))
                    Alert.alert('Wrong Email or Password');
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <View style={styles.container}>
            <Image
                style={styles.loginImage}
                source={require('../assets/logo.png')}
            />
            <Text style={styles.title}>Welcome to Book Owl</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    placeholderTextColor="#003f5c"
                    onChangeText={(email) => setEmail(email)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>
            <TouchableOpacity style={styles.loginBtn} onPress={onLogin}>
                <Text>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.registerBtn} onPress={() => navigation.navigate('Register')}>
                <Text>Register here</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    registerBtn: {
        width: "40%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "transparent",
    },
    title: {
        fontFamily: 'serif',
        fontSize: 20,
        marginBottom: 30,
    },
    loginBtn: {
        width: "40%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        backgroundColor: "rgb(116, 144, 147)",
    },
    inputView: {
        backgroundColor: "#fff",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
        borderWidth: 1,
        borderColor: 'black',
    },
    textInput: {
        height: 50,
        flex: 1,
        padding: 10,
        textAlign: 'center'
    },
    loginImage: {
        width: "55%",
        height: "35%",
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        marginTop: -20,
        marginBottom: 5,
        backgroundColor: "transparent",
    },
    forgot_button: {
        height: 30,
        marginBottom: 30,
    },
});
