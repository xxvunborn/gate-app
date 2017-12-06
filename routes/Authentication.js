import React, {Component} from 'react';
import {
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
import {FormLabel, FormInput, Button, Text, Icon} from 'react-native-elements'
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
          <Icon
            name='account-balance'
            color='#03a9f4'
            />
          <Text h2> Iniciar sesión en gate </Text>

          <View style={styles.form}>
            <FormLabel></FormLabel>
            <FormInput
             placeholder="Correo electronico"
             autoCapitalize='none'
            onChangeText={(email) => this.setState({email})}/>

            <FormLabel></FormLabel>
            <FormInput
             secureTextEntry={true}
             autoCapitalize='none'
             placeholder="Contraseña"
            onChangeText={(password) => this.setState({password})}/>

          </View>
          <View style={styles.buttonLogin}>
            <Button
            raised
            buttonStyle={{backgroundColor: '#03a9f4', borderRadius: 10, padding: 10}}
            textStyle={{textAlign: 'center'}}
            title={`Inciar sesión`}
            onPress={this.userLogin.bind(this)}
            />
          </View>

          <View style={{position: 'absolute', left: 0, right: 0, bottom: 3}}>
						<View style={styles.line}/>
            <Button
            raised
            buttonStyle={{backgroundColor: 'white', borderRadius: 10, padding: 10}}
            textStyle={{textAlign: 'center', color: '#03a9f4'}}
            title={`Registrate en gate`}
            onPress={this.userSignup.bind(this)}
            />
          </View>
        </View>
        );
  }
}

export default Authentication;

