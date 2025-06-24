import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Switch, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDarkMode } from '../context/DarkModeContext';
import { darkTheme, lightTheme } from '../utils/theme';

const ProfileScreen: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [name, setName] = useState('');

  useEffect(() => {
    const loadSettings = async () => {
      const storedName = await AsyncStorage.getItem('heroName');
      if (storedName) setName(storedName);
    };
    loadSettings();
  }, []);

  const saveName = async () => {
    await AsyncStorage.setItem('heroName', name);
    Alert.alert('Saved', 'Your hero name has been updated!');
  };

  const theme = isDarkMode ? darkTheme : lightTheme;
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>⚙️ Settings</Text>

      <View style={styles.settingRow}>
        <Text style={styles.label}>Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
      </View>

      <View style={styles.settingRowColumn}>
        <Text style={styles.label}>Hero Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          style={styles.input}
          onBlur={saveName}
        />
      </View>
    </View>
  );
};

const getStyles = (theme: typeof lightTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.background,
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: theme.text,
    },
    settingRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    settingRowColumn: {
      marginBottom: 20,
    },
    label: {
      fontSize: 18,
      marginBottom: 8,
      color: theme.text,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 8,
      padding: 10,
      fontSize: 16,
      color: theme.text,
    },
  });

export default ProfileScreen;
