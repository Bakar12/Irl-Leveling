import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskItem from '../components/TaskItem';

type Task = {
  name: string;
  xp: number;
  completed: boolean;
};

const initialTasks: Task[] = [
  { name: 'Move Your Body', xp: 10, completed: false },
  { name: 'Mind Reset', xp: 5, completed: false },
  { name: 'Gratitude Log', xp: 5, completed: false },
  { name: 'Learn & Code', xp: 10, completed: false },
  { name: 'No Doomscrolling', xp: 7, completed: false },
  { name: 'Read Fiction/Manga', xp: 3, completed: false },
  { name: 'Eat 5-a-Day', xp: 10, completed: false },
];

const HomeScreen: React.FC = () => {
  const [name, setName] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [xp, setXp] = useState<number>(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedName = await AsyncStorage.getItem('heroName');
        const storedXP = await AsyncStorage.getItem('xp');
        const storedTasks = await AsyncStorage.getItem('tasks');

        if (storedName) setName(storedName);
        if (storedXP) setXp(parseInt(storedXP));
        if (storedTasks) {
          const parsedTasks = JSON.parse(storedTasks);
          if (Array.isArray(parsedTasks)) {
            setTasks(parsedTasks);
          }
        }
      } catch (error) {
        console.error('Error loading data from AsyncStorage:', error);
      }
    };

    loadData();
  }, []);

  const toggleTask = async (index: number) => {
    const updatedTasks = [...tasks];
    const task = updatedTasks[index];

    task.completed = !task.completed;

    const xpChange = task.completed ? task.xp : -task.xp;
    const newXp = Math.max(xp + xpChange, 0);

    setTasks(updatedTasks);
    setXp(newXp);

    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      await AsyncStorage.setItem('xp', newXp.toString());
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        {name ? `Welcome back, ${name}!` : 'Loading...'}
      </Text>

      <Text style={styles.xpDisplay}>Current XP: {xp}</Text>
      <View style={styles.progressWrapper}>
        <Text style={styles.levelText}>Level: {Math.floor(xp / 50) + 1}</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(xp % 50) * 2}%` }]} />
        </View>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.name}
        renderItem={({ item, index }) => (
          <TaskItem
            name={item.name}
            xp={item.xp}
            completed={item.completed}
            onToggle={() => toggleTask(index)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  xpDisplay: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 20,
    textAlign: 'center',
    color: '#4CAF50',
  },
  progressWrapper: {
    marginBottom: 20,
  },
  levelText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
    textAlign: 'center',
  },
  progressBar: {
    height: 20,
    width: '100%',
    backgroundColor: '#eee',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
});

export default HomeScreen;