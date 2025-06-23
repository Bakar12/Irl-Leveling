import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StreaksScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🔥 Your Streaks & Badges</Text>
      <Text style={styles.text}>Feature coming soon...</Text>
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
    fontSize: 16,
    color: '#666',
  },
});

export default StreaksScreen;
