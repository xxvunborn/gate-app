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

class Keys extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      keys: null,
      gate_id: props.gate_id
    };
    this.userNewKey = this.userNewKey.bind(this);
    this.userConnect = this.userConnect.bind(this);
  }

  componentDidMount() {
    this.userKeys();
  }

  userKeys() {
    AsyncStorage.getItem('token').then((token) => {
      fetch('https://gate.ruvix.com/api/v1/gates/'+this.state.gate_id+'/keys', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token token='+ token
          }
          })
          .then((response) => response.json())
          .then((responseData) => this.setKeys(responseData))
    })
  }

  setKeys(responseData) {
    console.log(responseData);
    if (responseData.length == 0){
      return 0;
    }
    keys = responseData.map((key) => {
      return (
          <TouchableOpacity
            style={styles.buttonWrapper}
            key={key.id}
          >
            <Text
              style={styles.buttonText}
              onPress={() => this.userConnect("key")}>
              { key.name }
            </Text>
          </TouchableOpacity>
          )
    });
    this.setState({keys: keys})
  }

  userConnect(key) {
    Actions.Connect({key: key});
  }

  userNewKey(id){
    Actions.NewKey({gate_id: id});
  }

  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.title}> Keys </Text>
          { this.state.keys }

          <TouchableOpacity
            style={styles.buttonWrapper}
          >
            <Text
              style={styles.buttonText}
              //value={gate.id}
              onPress={() => this.userNewKey(this.state.gate_id)}>
                New key
            </Text>
          </TouchableOpacity>
        </View>
        );
  }
}

export default Keys;
