import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDarkMode } from '../context/DarkModeContext';
import { darkTheme, lightTheme } from '../utils/theme';

const StreaksScreen: React.FC = () => {
  const [streak, setStreak] = useState(0);
  const [lastDate, setLastDate] = useState('');
  const { isDarkMode } = useDarkMode();

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

  const theme = isDarkMode ? darkTheme : lightTheme;
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🔥 Your Streak</Text>
      <Text style={styles.text}>Days in a row: {streak}</Text>
      <Text style={styles.subtext}>Last activity: {lastDate}</Text>
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
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      color: theme.text,
    },
    text: {
      fontSize: 18,
      color: theme.accent,
      marginBottom: 4,
    },
    subtext: {
      fontSize: 14,
      color: theme.text,
    },
  });

export default StreaksScreen;
