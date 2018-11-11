import React, { Component } from 'react';

import api from '../services/api';

import { View, Text, TextInput, StyleSheet, TouchableOpacity, AsyncStorage }  from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default class New extends Component {
  static navigationOptions = {
    header: null
  }

  state = {
    newPru: ''
  };

  goBack = () => {
    this.props.navigation.pop();
  };

  handleNewPru = async () => {
    const content = this.state.newPru;
    const author = await AsyncStorage.getItem('@GoPru:username');

    await api.post('prus', { content, author });

    this.goBack();
  }

  handleInputChange = newPru => {
    this.setState({ newPru });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={this.goBack}>
            <Icon name="close" size={24} color="#4BB0EE"/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={this.handleNewPru}>
            <Text style={styles.buttonText}>Pru</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          multiline
          placeholder="O que você está pensando? Pru"
          value={this.state.newPru}
          onChangeText={this.handleInputChange}
          placeholderTextColor="#999"
          returnKeyType="send"
          onSubmitEditing={this.handleNewPru}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },

  header: {
    paddingTop: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  button: {
    height: 32,
    paddingHorizontal: 20,
    borderRadius: 16,
    backgroundColor: "#4BB0EE",
    justifyContent: "center",
    alignItems: "center"
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold"
  },

  input: {
    margin: 20,
    fontSize: 16,
    color: "#333"
  }
});
