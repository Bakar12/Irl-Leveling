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

  useEffect(() => {
    const loadName = async () => {
      const storedName = await AsyncStorage.getItem('heroName');
      setName(storedName);
    };

    loadName();
  }, []);

  const toggleTask = (index: number) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        {name ? `Welcome back, ${name}!` : 'Loading...'}
      </Text>

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
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default HomeScreen;

