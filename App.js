import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button } from 'react-native';
import { Constants } from 'expo';


export default class App extends React.Component {
  constructor() {
    super();
     this.state = {
      title: '',
      content: '',
      items: [
        { id: 1, title: `Title 1`, content: `Note 1`, done: false},
        { id: 2, title: `Title 2`, content: `Note 2`, done: false},
        { id: 3, title: `Title 3`, content: `Note 3`, done: true},
        { id: 4, title: `Title 4`, content: `Note 4`, done: false},
        { id: 5, title: `Title 5`, content: `Note 5`, done: true},
        { id: 6, title: `Title 6`, content: `Note 6`, done: false},

      ],
    }
  }
    

  renderItem = ({item}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content}>{item.content}</Text>
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

  addNote = () => this.setState(state => ({
    items: state.items.concat({
      title: state.title,
      content: state.content,
      done: false,
    })
  }))
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
