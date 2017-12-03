import React, {Component} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  AsyncStorage
} from 'react-native';
import styles from './styles';
import {Actions} from 'react-native-router-flux';

class NewGate extends Component {
  constructor() {
    super();
    this.state = {
      name: null,
      location: null
    };
  }

  userNewGate() {
    if (this.state.name && this.state.location) {
      AsyncStorage.getItem('token').then((token) => {
        fetch('https://gate.ruvix.com/api/v1/gates/', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-type': 'application/json',
              'Authorization': 'Token token='+ token
            },
            body: JSON.stringify({
              gate: {
                name: this.state.name,
                location: this.state.location
              }
              })
        })
        .then((response) => response.json())
        .then((responseData) => {
          if (responseData.errors) {
          Actions.Authentication();
            Alert.alert('Error', responseData.errors[0].detail);
            return 0;
          }
          Alert.alert('gate created')
            Actions.HomePage();
        })
      })
    } else {
      Alert.alert('All data is necesary')
    }
  }

  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.title}> New gate</Text>

          <View style={styles.form}>
            <TextInput
              editable={true}
              onChangeText={(name) => this.setState({name})}
              placeholder='Name'
              ref='name'
              returnKeyType='next'
              autoCapitalize='none'
              style={styles.inputText}
              value={this.state.name}
            />
            <TextInput
              editable={true}
              onChangeText={(location) => this.setState({location})}
              placeholder='Location'
              ref='name'
              returnKeyType='next'
              autoCapitalize='none'
              style={styles.inputText}
              value={this.state.location}
            />

            <TouchableOpacity
              style={styles.bottonWrapper}
              onPress={this.userNewGate.bind(this)}>
              <Text
                style={styles.buttonText}>
                  Create
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        );
  }
}

export default NewGate;
