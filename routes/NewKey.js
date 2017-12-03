import React, {Component} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ListView,
  AsyncStorage
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from './styles';

class NewKey extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      name: null,
      user_id: null,
      expired_at: null,
      gate_id: props.gate_id
    };
  }

  userNewKey() {
    if(this.state.name && this.state.user_id && this.state.expired_at) {
      AsyncStorage.getItem('token').then((token) => {
        fetch('https://gate.ruvix.com/api/v1/gates/'+this.state.gate_id+'/keys', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-type': 'application/json',
              'Authorization': 'Token token='+ token
            },
            body: JSON.stringify({
              key: {
                name: this.state.name,
                user_id: this.state.user_id,
                expired_at: this.state.expired_at
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
          Alert.alert('gate created');
          console.log(responseData);
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
        <Text style={styles.title}> New key </Text>

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
            onChangeText={(user_id) => this.setState({user_id})}
            placeholder='user id'
            ref='user_id'
            returnKeyType='next'
            autoCapitalize='none'
            style={styles.inputText}
            value={this.state.user_id}
          />
          <TextInput
            editable={true}
            onChangeText={(expired_at) => this.setState({expired_at})}
            placeholder='expired at'
            ref='expired at'
            returnKeyType='next'
            autoCapitalize='none'
            style={styles.inputText}
            value={this.state.expired_at}
          />

          <TouchableOpacity
            style={styles.bottonWrapper}
            onPress={this.userNewKey.bind(this)}>
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

export default NewKey;
