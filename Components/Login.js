
import React, { useState } from "react";
import { StyleSheet, Alert, Text, View, Image, TextInput, Button, TouchableOpacity } from "react-native";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAC_om6HN224gaJSHas_OVPDpuJEXwQj2U",
    authDomain: "authentication-2850e.firebaseapp.com",
    databaseURL: "https://authentication-2850e-default-rtdb.firebaseio.com/",
    projectId: "authentication-2850e",
    storageBucket: "authentication-2850e.appspot.com",
    messagingSenderId: "381706680742",
    appId: "1:381706680742:web:2f037a8a1ebf73d9a93767"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //await firebase.auth().signInWithEmailAndPassword(email, password)
    const onLogin = async () => {
        try {
            if (email !== '' && password !== '') {
                let response = await signInWithEmailAndPassword(auth, email, password);
                if (response) {
                    console.log(response)
                }
            }
        } catch (error) {
            Alert.alert("Invalid Email or Password");
        }
    };

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require('../assets/logo.png')}
            />
            <Text style={styles.title}>Welcome to Book Owl</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Email"
                    placeholderTextColor="#003f5c"
                    onChangeText={(email) => setEmail(email)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password"
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>
            <TouchableOpacity>
                <Text style={styles.forgot_button}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn} onPress={onLogin}>
                <Text>LOGIN</Text>
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
    title: {
        fontFamily: 'serif',
        fontSize: 20,
        marginBottom: 30,
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
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
    },
    loginBtn: {
        width: "40%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "rgb(116, 144, 147)",
    },
    image: {
        width: "45%",
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
