import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import searchPage from './Components/searchPage';
import Login from './Components/Login';
import { store } from './Components/SigninReducer';

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
    </Stack.Navigator>
  );
};

const HomeTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Search"
        component={searchPage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book-search-outline" color={color} size={size} />
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
      {isSigned ? <HomeTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}
