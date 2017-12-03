import React, {Component} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  AsyncStorage
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from './styles';

class Signup extends Component<{}> {
  constructor() {
    super();
    this.state = {
      name: null,
      email: null,
      password: null
    };
  }

  userSignup() {
  if (this.state.email && this.state.name && this.state.password) {
    fetch('https://gate.ruvix.com/api/v1/users/signup', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            email: this.state.email,
            password: this.state.password,
            name: this.state.name
          }
        })
      })
      .then((response) => response.json())
        .then((responseData) => {
        if (responseData.errors) {
        Actions.Authentication();
          Alert.alert('Error', responseData.errors[0].detail);
          return 0;
        } else {
          Alert.alert('User created, now login');
          Actions.Authentication();
        }
        })
      .done();
    }
  }

  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.title}> Gate </Text>

          <View style={styles.form}>
            <TextInput
              editable={true}
              onChangeText={(email) => this.setState({email})}
              placeholder='email'
              ref='username'
              returnKeyType='next'
              autoCapitalize='none'
              style={styles.inputText}
              value={this.state.email}
            />

            <TextInput
              editable={true}
              onChangeText={(password) => this.setState({password})}
              placeholder='password'
              ref='password'
              secureTextEntry={true}
              style={styles.inputText}
              value={this.state.password}
            />

            <TextInput
              editable={true}
              onChangeText={(name) => this.setState({name})}
              placeholder='name'
              ref='name'
              style={styles.inputText}
              value={this.state.name}
            />

            <TouchableOpacity style={styles.buttonWrapper} onPress={this.userSignup.bind(this)}>
              <Text style={styles.buttonText}> Sign Up </Text>
            </TouchableOpacity>
          </View>
        </View>
        );
  }
}

export default Signup;


