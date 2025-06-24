import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDarkMode } from '../context/DarkModeContext';
import { darkTheme, lightTheme } from '../utils/theme';

interface TaskItemProps {
  name: string;
  xp: number;
  completed: boolean;
  onToggle: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ name, xp, completed, onToggle }) => {
  const { isDarkMode } = useDarkMode();
  const theme = isDarkMode ? darkTheme : lightTheme;
  const styles = getStyles(theme);

  return (
    <TouchableOpacity style={[styles.task, completed && styles.completed]} onPress={onToggle}>
      <Text style={styles.taskText}>{name}</Text>
      <Text style={styles.xpText}>+{xp} XP</Text>
    </TouchableOpacity>
  );
};

const getStyles = (theme: typeof lightTheme) =>
  StyleSheet.create({
    task: {
      padding: 15,
      borderRadius: 10,
      marginVertical: 8,
      backgroundColor: theme.card,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    completed: {
      backgroundColor: theme.success,
    },
    taskText: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.text,
    },
    xpText: {
      fontSize: 16,
      color: theme.text,
    },
  });

export default TaskItem;
