import React, {Component} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  AsyncStorage,
  ScrollView,
  NativeEventEmitter,
  NativeModules,
  ListView
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from './styles';


class Authentication extends Component {

  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      peripherals: new Map()
    };
  }

  async saveItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.log('AsyncStorage error:' + error.message);
    }
  }


  userLogin() {
    if (this.state.email && this.state.password) {
    fetch('https://gate.ruvix.com/api/v1/sessions', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
        })
      })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.errors) {
        Actions.Authentication();
          Alert.alert('Error', responseData.errors[0].detail);
          return 0;
        }
        console.log(responseData);
        this.saveItem('token', responseData.token),
        Alert.alert('Success login');
        Actions.HomePage();
      })
    .catch((error) => {
      console.log(error);
    });
      //.done();
    } else {
      Alert.alert('Enter email and password');
    }
  }

  userSignup() {
    Actions.Signup();
  }

  async saveItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.log('AsyncStorage error:' + error.message)
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
              placeholder='Email'
              ref='username'
              returnKeyType='next'
              autoCapitalize='none'
              style={styles.inputText}
              value={this.state.email}
            />

            <TextInput
              editable={true}
              onChangeText={(password) => this.setState({password})}
              placeholder='Password'
              ref='password'
              returnKeyType='next'
              secureTextEntry={true}
              style={styles.inputText}
              value={this.state.password}
            />

            <TouchableOpacity style={styles.bottonWrapper} onPress={this.userLogin.bind(this)}>
              <Text style={styles.buttonText}> Log In </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonWrapper} onPress={this.userSignup.bind(this)}>
              <Text style={styles.buttonText}> Sign Up </Text>
            </TouchableOpacity>

          </View>
        </View>
        );
  }
}

export default Authentication;

