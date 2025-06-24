import React, { useEffect, useState } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkModeProvider, useDarkMode } from './context/DarkModeContext';
import { darkTheme, lightTheme } from './utils/theme';

import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import StreaksScreen from './screens/StreaksScreen';
import ProfileScreen from './screens/ProfileScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
      }}
    >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            headerShown: false,
          }}
        />
        <Tab.Screen 
          name="Streaks" 
          component={StreaksScreen}
          options={{
            tabBarLabel: 'Streaks',
            headerShown: false,
          }}
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            headerShown: false,
          }}
        />
    </Tab.Navigator>
  );
};


const AppContent: React.FC<{ isFirstTime: boolean }> = ({ isFirstTime }) => {
  const { isDarkMode } = useDarkMode();
  const navTheme = isDarkMode ? NavigationDarkTheme : DefaultTheme;

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isFirstTime ? (
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
        ) : null}
        <Stack.Screen name="Home" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App: React.FC = () => {
  const [isFirstTime, setIsFirstTime] = useState<boolean | null>(null);

  useEffect(() => {
    const checkFirstTime = async () => {
      try {
        const heroName = await AsyncStorage.getItem('heroName');
        setIsFirstTime(!heroName);
      } catch (error) {
        console.error('Error checking first time:', error);
        setIsFirstTime(true);
      }
    };

    checkFirstTime();
  }, []);

  if (isFirstTime === null) {
    return null; // Loading state
  }

  return (
    <DarkModeProvider>
      <AppContent isFirstTime={isFirstTime} />
    </DarkModeProvider>
  );
};

export default App;