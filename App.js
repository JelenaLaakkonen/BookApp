import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons, AntDesign, Entypo } from '@expo/vector-icons';
import searchPage from './Components/searchPage';
import Login from './Components/Login';
import Register from './Components/Register';
import Bookshelf from './Components/Bookshelf';
import BookDetails from './Components/BookDetails';
import { signIn, store } from './Components/SigninReducer';
import test from './Components/test'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
      />
    </Stack.Navigator>
  );
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={searchPage}
        options={{
          headerRight: () => (
            <AntDesign.Button
              onPress={() => store.dispatch(signIn(false))}
              color="black"
              backgroundColor="rgb(116, 144, 147)"
              name="logout"
              size={28}
            />
          ),
        }} />
      <Stack.Screen name="BookDetails" component={BookDetails} />
    </Stack.Navigator>
  );
}

const BookShelfStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Bookshelf"
        component={Bookshelf}
        options={{
          headerRight: () => (
            <AntDesign.Button
              onPress={() => store.dispatch(signIn(false))}
              color="black"
              backgroundColor="rgb(116, 144, 147)"
              name="logout"
              size={28}
            />
          ),
        }} />
    </Stack.Navigator>
  );
}

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="SearchTab"
        component={MainStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book-search-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="BookshelfTab"
        component={BookShelfStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="open-book" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name="test"
        component={test}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  const [isSigned, setIsSigned] = useState(true);

  // Update state from redux
  store.subscribe(() => {
    setIsSigned(store.getState());
  })

  return (
    // Check if 'isSigned' is true and change the path from 'Login' to 'Search' if true    
    <NavigationContainer>
      {isSigned ? <BottomTabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
}
