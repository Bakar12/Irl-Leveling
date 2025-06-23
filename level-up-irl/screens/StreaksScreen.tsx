import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StreaksScreen: React.FC = () => {
  const [streak, setStreak] = useState(0);
  const [lastDate, setLastDate] = useState('');

  useEffect(() => {
    const checkStreak = async () => {
      try {
        const today = new Date().toDateString();
        const storedDate = await AsyncStorage.getItem('lastCompleteDate');
        const storedStreak = await AsyncStorage.getItem('streak');

        if (storedDate === today) {
          setStreak(Number(storedStreak) || 0);
          setLastDate(storedDate);
          return;
        }

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (storedDate === yesterday.toDateString()) {
          const newStreak = (Number(storedStreak) || 0) + 1;
          setStreak(newStreak);
          setLastDate(today);
          await AsyncStorage.setItem('streak', newStreak.toString());
        } else {
          setStreak(1);
          setLastDate(today);
          await AsyncStorage.setItem('streak', '1');
        }

        await AsyncStorage.setItem('lastCompleteDate', today);
      } catch (error) {
        console.error('Failed to check streak:', error);
      }
    };

    checkStreak();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🔥 Your Streak</Text>
      <Text style={styles.text}>Days in a row: {streak}</Text>
      <Text style={styles.subtext}>Last activity: {lastDate}</Text>
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
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    color: '#4CAF50',
    marginBottom: 4,
  },
  subtext: {
    fontSize: 14,
    color: '#777',
  },
});

export default StreaksScreen;
