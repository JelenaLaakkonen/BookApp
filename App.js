import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import searchPage from './Components/searchPage';
import Login from './Components/Login';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Login"
          component={Login}
        />
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
    </NavigationContainer>
  );
}


