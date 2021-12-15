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
import bookshelves from './Components/bookshelves'
import currentlyReading from "./Components/currentlyReading";
import WantToRead from "./Components/WantToRead";
import Home from "./Components/Home";
import BooksByGenre from "./Components/BooksByGenre";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// headerTitleAlign: 'center',

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerStyle: {
            backgroundColor: 'rgb(116, 144, 147)',
          },
          headerTitle: ""
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerStyle: {
            backgroundColor: 'rgb(116, 144, 147)',
          }
        }}
      />
    </Stack.Navigator>
  );
};

const SearchStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SearchTab"
        component={searchPage}
        options={{
          headerStyle: {
            backgroundColor: 'rgb(116, 144, 147)',
            elevation: 0,
          },
          title: 'Search',
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
      <Stack.Screen
        name="BookDetails"
        component={BookDetails}
        options={{
          headerStyle: {
            backgroundColor: 'rgb(116, 144, 147)',
          },
          headerTitle: "Details"
        }}
      />
    </Stack.Navigator>
  );
}

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeTab"
        component={Home}
        options={{
          headerStyle: {
            backgroundColor: 'rgb(116, 144, 147)',
          },
          title: 'Home',
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
      <Stack.Screen
        name="Genre Search"
        component={BooksByGenre}
        options={{
          headerStyle: {
            backgroundColor: 'rgb(116, 144, 147)',
          }
        }}
      />
      <Stack.Screen
        name="BookDetailsGenre"
        component={BookDetails}
        options={{
          headerStyle: {
            backgroundColor: 'rgb(116, 144, 147)',
          },
          headerTitle: "Details"
        }}
      />
    </Stack.Navigator>
  );
}


const BookShelfStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BookshelfTab"
        component={bookshelves}
        options={{
          headerStyle: {
            backgroundColor: 'rgb(116, 144, 147)',
          },
          title: 'Bookshelves',
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
      <Stack.Screen
        name="Read"
        component={Bookshelf}
        options={{
          headerStyle: {
            backgroundColor: 'rgb(116, 144, 147)',
          }
        }} />
      <Stack.Screen
        name="Currently Reading"
        component={currentlyReading}
        options={{
          headerStyle: {
            backgroundColor: 'rgb(116, 144, 147)',
          }
        }} />
      <Stack.Screen
        name="Want to Read"
        component={WantToRead}
        options={{
          headerStyle: {
            backgroundColor: 'rgb(116, 144, 147)',
          }
        }} />
    </Stack.Navigator>
  );
}

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'rgb(116, 144, 147)',
        //tabBarActiveBackgroundColor: 'rgb(116, 144, 147)',
        //tabBarInactiveBackgroundColor: 'rgb(116, 144, 147)',
      }}
    >
      <Tab.Screen
        name="Home"
        component={MainStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book-search-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Bookshelves"
        component={BookShelfStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="open-book" color={color} size={size} />
          )
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {

  const [isSigned, setIsSigned] = useState(false);

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
