import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useDarkMode } from '../context/DarkModeContext';
import { darkTheme, lightTheme } from '../utils/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useNavigation } from '@react-navigation/native';

type WelcomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;

const WelcomeScreen: React.FC = () => {
  const [name, setName] = useState('');
  const navigation = useNavigation<WelcomeScreenNavigationProp>();
  const { isDarkMode } = useDarkMode();

  const handleStart = async () => {
    if (!name.trim()) {
      Alert.alert('Please enter your name');
      return;
    }

    try {
      await AsyncStorage.setItem('heroName', name);
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Failed to save your name. Please try again.');
    }
  };

  const theme = isDarkMode ? darkTheme : lightTheme;
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎮 Welcome to Level Up IRL</Text>
      <Text style={styles.label}>Enter your hero name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
      <Button title="Start Your Journey" onPress={handleStart} />
    </View>
  );
};

const getStyles = (theme: typeof lightTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: theme.background,
    },
    title: {
      fontSize: 26,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: theme.text,
    },
    label: {
      fontSize: 18,
      marginBottom: 10,
      color: theme.text,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.border,
      padding: 10,
      borderRadius: 8,
      width: '100%',
      marginBottom: 20,
      color: theme.text,
    },
  });

export default WelcomeScreen;
