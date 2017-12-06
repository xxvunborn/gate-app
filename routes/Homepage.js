import React, {Component} from 'react';
import {
  Alert,
  Image,
  TouchableOpacity,
  View,
  ScrollView,
  AsyncStorage
} from 'react-native';
import {FormLabel, FormInput, Button, Text, Icon} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import styles from './styles';

class HomePage extends Component {

  constructor() {
    super();
    this.state = {
      gates: null
    };
    this.userKeys = this.userKeys.bind(this);
  }

  componentDidMount() {
    this.userGate();
  }

  userGate() {
    AsyncStorage.getItem('token').then((token) => {
      fetch('https://gate.ruvix.com/api/v1/gates', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Token token='+token
        }
      })
      .then((response) => response.json())
        .then((responseData) => this.setGates(responseData));
      })
  }

  setGates(responseData) {
    gates = responseData.map((gate) => {
      return (
      <View style={styles.buttonWrapper}>
        <Button
        raised
        buttonStyle={{backgroundColor: '#03a9f4', borderRadius: 10, padding: 10}}
        textStyle={{textAlign: 'center'}}
        key = {gate.id}
        value = {gate.id}
        onPress={ () => this.userKeys(gate.id)}>
        />
      </View>
        )
    });
    this.setState({gates: gates})
  }

  async userLogout() {
    try {
      await AsyncStorage.removeItem('token');
      Alert.alert('Logout Success!');
      Actions.Authentication();
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  userKeys(id) {
    Actions.Keys({gate_id: id});
  }

  userNewGate() {
    Actions.NewGate();
  }

  render() {
    return (
        <View style={styles.container}>

        <Text style={styles.title}> Gates </Text>

        <ScrollView>
          { this.state.gates }
        </ScrollView>

      <View style={styles.buttonWrapper}>
        <Button
        raised
        buttonStyle={{backgroundColor: '#03a9f4', borderRadius: 10, padding: 10}}
        textStyle={{textAlign: 'center'}}
        title={`Crear nueva puerta`}
        onPress={this.userNewGate.bind(this)}
        />
      </View>

      <View style={styles.buttonWrapper}>
        <Button
        raised
        buttonStyle={{backgroundColor: '#03a9f4', borderRadius: 10, padding: 10}}
        textStyle={{textAlign: 'center'}}
        title={`Cerrar sesión`}
        onPress={this.userLogout}
        />
      </View>
      </View>
        );
  }
}

export default HomePage;
