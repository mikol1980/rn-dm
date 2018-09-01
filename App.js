import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Constants } from 'expo';


export default class App extends React.Component {
  constructor() {
    super();
     this.state = {
      items: [
        { title: `Title 1`, content: `Note 1`},
        { title: `Title 2`, content: `Note 2`},
        { title: `Title 3`, content: `Note 3`},
        { title: `Title 4`, content: `Note 4`},

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
        <FlatList data={this.state.items} renderItem={this.renderItem} />
      </View>
      
    );
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
});
