import React, {Component} from 'react';
import {
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  AsyncStorage
} from 'react-native';
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
        <TouchableOpacity
          style={styles.buttonWrapper}
          key = {gate.id}
          value = {gate.id}
          onPress={() => this.userKeys(gate.id)}>
          <Text style={styles.buttonText}> { gate.name } </Text>
        </TouchableOpacity>
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

        <TouchableOpacity style={styles.buttonWrapper} onPress={this.userNewGate.bind(this)}>
          <Text style={styles.buttonText}> New gate </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonWrapper} onPress={this.userLogout}>
          <Text style={styles.buttonText}> Logout </Text>
        </TouchableOpacity>
      </View>
        );
  }
}

export default HomePage;
