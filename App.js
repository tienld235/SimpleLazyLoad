// test lazyload
import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, Image, ActivityIndicator } from 'react-native';
import Axios from 'axios';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      page: 1,
      isLoading: true
    }
  }

  componentDidMount() {
    this.getData();
  }

  renderFooter = () => (
    this.state.isLoading ?
      <View style={styles.loader}>
        <ActivityIndicator size={"large"} />
      </View> : null
  )

  renderRow = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.id}</Text>
      <Image style={styles.itemImage} source={{ uri: item.url }} />
      <Text style={styles.itemText}>{item.title}</Text>
    </View>
  )
  getData = async () => {
    let response = await Axios.get(`https://jsonplaceholder.typicode.com/photos?_limit=5&_page=${this.state.page}`);
    let data = await response.data;
    
    this.setState({
      data: this.state.data.concat(data),
      isLoading: false
    })
  }

  handleLoadMore = async () => {
    await this.setState({ page: this.state.page + 1, isLoading: true});
    this.getData();
  }

  render() {
    console.log(this.state.page);
    console.log("data", this.state.data);
    
    return (
      <FlatList
        data={this.state.data}
        style={styles.container}
        renderItem={this.renderRow}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={this.handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={this.renderFooter}

      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    marginTop: 20
  },
  item: {
    borderBottomColor: '#CCC',
    marginBottom: 10
  },
  itemImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover'
  },
  itemText: {
    fontSize: 16,
    padding: 5
  },
  loader: {
    marginTop: 10,
    alignItems: "center"
  }
});