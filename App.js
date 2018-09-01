import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button, AsyncStorage, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';
import { MaterialIcons } from '@expo/vector-icons'
import { StackNavigator } from 'react-navigation';

const noteItems = 'devmeeting:text';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  state = {
    items: [
      { id: 1, title: `Title 1`, content: `Note 1`, done: false},
      { id: 2, title: `Title 2`, content: `Note 2`, done: false},
      { id: 3, title: `Title 3`, content: `Note 3`, done: true},
      { id: 4, title: `Title 4`, content: `Note 4`, done: false},
      { id: 5, title: `Title 5`, content: `Note 5`, done: true},
      { id: 6, title: `Title 6`, content: `Note 6`, done: false},

    ],
  };

  render() {
    return (
      <View>
        <Text>Home</Text>
        {this.state.items.map(item => (
          <Button
            key={item.id}
            title={`Show note ${item.id}`}
            onPress={() => this.props.navigation.navigate('Item', item)}
          />
        ))}
      </View>
    );
  }
}

renderItem = ({item}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.content}>{item.content}</Text>
    <TouchableOpacity onPress={() => this.deleteItem(item.index)}>
      <MaterialIcons name="delete" size={16} color="red"/>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => this.updateItem(item.index)}>
      <MaterialIcons name="edit" size={16} color="red" />
    </TouchableOpacity>
  </View>
);

const ItemScreen = ({ navigation }) => (
  <View>
    <Text style={styles.title}>{navigation.getParam('title')}</Text>
    <Text style={styles.content}>{navigation.getParam('content')}</Text>
    <TouchableOpacity onPress={() => this.deleteItem(navigation.state.params.id)}>
      <MaterialIcons name="delete" size={16} color="red"/>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => this.updateItem(navigation.state.params.id)}>
      <MaterialIcons name="edit" size={16} color="red" />
    </TouchableOpacity>
    <Button title="Go back" onPress={() => navigation.goBack()} />
  </View>
);
ItemScreen.navigationOptions = ({ navigation }) => ({title: `Item #${navigation.getParam('id')}`})

const Navigator = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    AddItem: {
      scree: AddItemScreen,
    },
    Item: {
      screen: ItemScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
);


export default class App extends React.Component {
  render() {
    return <Navigator />;
  }
  // constructor() {
  //   super();
  //    this.state = {
  //     title: '',
  //     content: '',
  //     items: [
  //       { index: 1, title: `Title 1`, content: `Note 1`, done: false},
  //       { index: 2, title: `Title 2`, content: `Note 2`, done: false},
  //       { index: 3, title: `Title 3`, content: `Note 3`, done: true},
  //       { index: 4, title: `Title 4`, content: `Note 4`, done: false},
  //       { index: 5, title: `Title 5`, content: `Note 5`, done: true},
  //       { index: 6, title: `Title 6`, content: `Note 6`, done: false},

  //     ],
  //   }
  // }

  // componentWillMount() {
  //   // AsyncStorage.getItem(noteItems).then(items => this.setState({ items }));
  // }
    

  // renderItem = ({item}) => (
  //   <View style={styles.item}>
  //     <Text style={styles.title}>{item.title}</Text>
  //     <Text style={styles.content}>{item.content}</Text>
  //     <TouchableOpacity onPress={() => this.deleteItem(item.index)}>
  //       <MaterialIcons name="delete" size={16} color="red"/>
  //     </TouchableOpacity>
  //     <TouchableOpacity onPress={() => this.updateItem(item.index)}>
  //       <MaterialIcons name="edit" size={16} color="red" />
  //     </TouchableOpacity>
  //   </View>
  // );

  // render() {
  //   return (
  //     <View style={styles.container}>
  //       <TextInput
  //        placeholder="Title"
  //        returnKeyType="done"
  //        style={styles.input}
  //        onChangeText={this.titleChanged}
  //       />
  //       <TextInput
  //         placeholder="Content"
  //         multiline = {true}
  //         numberOfLines = {4}
  //         style={styles.input}
  //         onChangeText={this.contentChanged}
  //         />
  //         <Button
  //           title="Add note"
  //           onPress={this.addNote}
  //         />
  //       <FlatList data={this.state.items} renderItem={this.renderItem} />
  //     </View>
      
  //   );
  // }

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
