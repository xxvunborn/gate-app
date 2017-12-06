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
      peripherals: new Map()
    };
  }

  userSignup() {
    Actions.Signup();
  }

  render() {
    return (
        <View style={styles.container}>
          <Icon
            name='account-balance'
            color='#03a9f4'
            />
          <Text h2> :w </Text>

          </View>
          <View style={styles.buttonLogin}>
            <Button
            raised
            buttonStyle={{backgroundColor: 'red', borderRadius: 10, padding: 10}}
            textStyle={{textAlign: 'center'}}
            title={`Inciar sesión`}
            onPress={this.userLogin.bind(this)}
            />
          </View>

          <View>
            <Button
            raised
            buttonStyle={{backgroundColor: '#03a9f4', borderRadius: 10, padding: 10}}
            textStyle={{textAlign: 'center'}}
            title={`Crear cuenta`}
            onPress={this.userSignup.bind(this)}
            />
          </View>
        </View>
        );
  }
}

export default Authentication;

