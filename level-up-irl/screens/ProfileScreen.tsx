import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Switch, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    const loadSettings = async () => {
      const storedDark = await AsyncStorage.getItem('darkMode');
      const storedName = await AsyncStorage.getItem('heroName');
      if (storedDark !== null) setDarkMode(storedDark === 'true');
      if (storedName) setName(storedName);
    };
    loadSettings();
  }, []);

  const toggleDarkMode = async () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    await AsyncStorage.setItem('darkMode', newValue.toString());
  };

  const saveName = async () => {
    await AsyncStorage.setItem('heroName', name);
    Alert.alert('Saved', 'Your hero name has been updated!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>⚙️ Settings</Text>

      <View style={styles.settingRow}>
        <Text style={styles.label}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={toggleDarkMode} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
});

export default ProfileScreen;
