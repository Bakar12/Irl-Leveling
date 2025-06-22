import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen: React.FC = () => {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const loadName = async () => {
      try {
        const storedName = await AsyncStorage.getItem('heroName');
        setName(storedName);
      } catch (error) {
        console.error('Failed to load name:', error);
      }
    };

    loadName();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {name ? `Welcome back, ${name}!` : 'Loading...'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;

