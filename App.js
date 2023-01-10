import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  ScrollView,
  TextInput
} from 'react-native';
import CheckBox from 'expo-checkbox';
import {
  ref,
  onValue,
  push,
  update,
  remove
} from 'firebase/database';
import { db } from './firebase-config.js';
import axios from 'axios';

const App = () => {
  const [todos, setTodos] = useState({});
  const [presentTodo, setPresentTodo] = useState('');
  const todosKeys = Object.keys(todos);
  const [quote, setQuote] = useState();

  useEffect(() => {
    fetchAdvice();
    return onValue(ref(db, '/todos'), querySnapShot => {
      let data = querySnapShot.val() || {};
      let todoItems = { ...data };
      setTodos(todoItems);
    });
  }, []);

  function addNewTodo() {
    push(ref(db, '/todos'), {
      done: false,
      title: presentTodo,
    });
    setPresentTodo('');
  }

  function clearTodos() {
    remove(ref(db, '/todos'));
  }

  function fetchAdvice() {
    axios.get('https://api.adviceslip.com/advice')
      .then((response) => {
        const { advice } = response.data.slip;
        setQuote(advice);
      })
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}>
      <View>
        {todosKeys.length > 0 ? (
          todosKeys.map(key => (
            <ToDoItem
              key={key}
              id={key}
              todoItem={todos[key]}
            />
          ))
        ) : (
          <Text>No todo item</Text>
        )}
      </View>

      <TextInput
        placeholder="New To Do"
        value={presentTodo}
        style={styles.textInput}
        onChangeText={text => {
          setPresentTodo(text);
        }}
        onSubmitEditing={addNewTodo}
      />

      <View>
        <View style={{ marginTop: 20 }}>
          <Button
            title="Add New To Do"
            onPress={addNewTodo}
            color="green"
            disabled={presentTodo == ''}
          />
        </View>

        <View style={{ marginTop: 20 }}>
          <Button
            title="Clear To Do List"
            onPress={clearTodos}
            color="red"
            style={{ marginTop: 20 }}
          />
        </View>
      </View>
      <View style={styles.quoteContainer}>
        <Text>{quote}</Text>
        <Button
          title="Get New Quote"
          onPress={fetchAdvice}
          color="orange"
          style={{ marginTop: 20 }}
        />
      </View>
    </ScrollView>
  );
}

const ToDoItem = ({ todoItem: { title, done }, id }) => {
  const [doneState, setDone] = useState(done);

  const onCheck = (isChecked) => {
    setDone(isChecked);
    update(ref(db, '/todos'), {
      [id]: {
        title,
        done: !doneState,
      },
    });
  };
  return (
    <View style={styles.todoItem}>
      <CheckBox
        onValueChange={onCheck}
        value={doneState}
      />
      <Text style={[styles.todoText, { opacity: doneState ? 0.2 : 1 }]}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12
  },
  contentContainerStyle: {
    padding: 24
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#afafaf',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 20,
    fontSize: 20,
  },
  todoItem: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center'
  },
  todoText: {
    paddingHorizontal: 5,
    fontSize: 16
  },
  quoteContainer: {
    marginTop: 20,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    padding: 25,
  },
});

export default App;