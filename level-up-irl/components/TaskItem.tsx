import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface TaskItemProps {
  name: string;
  xp: number;
  completed: boolean;
  onToggle: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ name, xp, completed, onToggle }) => {
  return (
    <TouchableOpacity style={[styles.task, completed && styles.completed]} onPress={onToggle}>
      <Text style={styles.taskText}>{name}</Text>
      <Text style={styles.xpText}>+{xp} XP</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  task: {
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  completed: {
    backgroundColor: '#c4f0c4',
  },
  taskText: {
    fontSize: 16,
    fontWeight: '500',
  },
  xpText: {
    fontSize: 16,
    color: '#666',
  },
});

export default TaskItem;
