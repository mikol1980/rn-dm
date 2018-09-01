import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button, AsyncStorage, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';
import { MaterialIcons } from '@expo/vector-icons'

const noteItems = 'devmeeting:text';

export default class App extends React.Component {
  constructor() {
    super();
     this.state = {
      title: '',
      content: '',
      items: [
        { index: 1, title: `Title 1`, content: `Note 1`, done: false},
        { index: 2, title: `Title 2`, content: `Note 2`, done: false},
        { index: 3, title: `Title 3`, content: `Note 3`, done: true},
        { index: 4, title: `Title 4`, content: `Note 4`, done: false},
        { index: 5, title: `Title 5`, content: `Note 5`, done: true},
        { index: 6, title: `Title 6`, content: `Note 6`, done: false},

      ],
    }
  }

  componentWillMount() {
    // AsyncStorage.getItem(noteItems).then(items => this.setState({ items }));
  }
    

  renderItem = ({item}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content}>{item.content}</Text>
      <TouchableOpacity onPress={() => this.deleteItem(item.index)}>
        <MaterialIcons name="delete" size={16} color="red"/>
      </TouchableOpacity>
      <MaterialIcons name="edit" size={16} color="red" />
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <TextInput
         placeholder="Title"
         returnKeyType="done"
         style={styles.input}
         onChangeText={this.titleChanged}
        />
        <TextInput
          placeholder="Content"
          multiline = {true}
          numberOfLines = {4}
          style={styles.input}
          onChangeText={this.contentChanged}
          />
          <Button
            title="Add note"
            onPress={this.addNote}
          />
        <FlatList data={this.state.items} renderItem={this.renderItem} />
      </View>
      
    );
  }

  titleChanged = text =>
    this.setState(state => ({
      title: text,
    }));

  contentChanged = text =>
    this.setState(state => ({
      content: text,
    }));

  addNote = () => {
    this.setState(state => ({
      items: state.items.concat({
        title: state.title,
        content: state.content,
        done: false,
      })
    }))
    AsyncStorage.setItem(noteItems, this.state.items);
  }

  deleteItem = (index) => {
    this.setState(this.state.items.filter((item, index) => index !== index))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  item: {
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: 'bold',
    marginVertical: 5,
  },
  content: {
    marginBottom: 10,
  },
  input: {
    width: 100,
  },
});
