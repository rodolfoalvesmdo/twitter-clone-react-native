import React, { Component } from 'react';

import api from '../services/api';
import socket from 'socket.io-client';

import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

import Pru from '../components/Pru';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Timeline extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Início',
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('New')}>
        <Icon 
          style={{ marginRight: 20 }}
          name="add-circle-outline"
          size={24}
          color="#4BB0EE"/>
      </TouchableOpacity>
    )
  });

  state = {
    prus: []
  };

  async componentDidMount() {
    this.subscribeToEvents();

    const response = await api.get('prus');

    this.setState({ prus: response.data });
  }

  subscribeToEvents = () => {
    const io = socket('http://10.0.3.2:3000');

    io.on('pru', data => {
      this.setState({ prus: [data, ...this.state.prus] });
    })

    io.on('like', data => {
      this.setState({
        prus: this.state.prus.map(
          pru => (pru._id === data._id ? data : pru)
        )
      });
    });
  };

  render() {
    return (
      <View style={styles.container}>

        <FlatList 
          data={this.state.prus}
          keyExtractor={pru => pru._id}
          renderItem={({ item }) => <Pru pru={item}/>}
          />
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  }
});
