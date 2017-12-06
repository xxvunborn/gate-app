/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  Router,
  Scene
} from 'react-native-router-flux';
import Authentication  from './routes/Authentication'
import HomePage  from './routes/Homepage'
import Signup from './routes/Signup'
import Keys from './routes/keys'
import Connect from './routes/Connect'
import NewGate from './routes/NewGate'
import NewKey from './routes/NewKey'

export default class App extends Component<{}> {
 render() {
    return(
        <Router>
          <Scene key='root'>
            <Scene
              component={Authentication}
              hideNavBar={true}
              key='Authentication'
              title='Authentication'
            />
            <Scene
              component={HomePage}
              initial={true}
              hideNavBar={true}
              key='HomePage'
              title='Home Page'
            />
            <Scene
              component={NewGate}
              hideNavBar={false}
              key='NewGate'
              title='New Gate'
            />
            <Scene
              component={NewKey}
              hideNavBar={false}
              key='NewKey'
              title='New Key'
            />
            <Scene
              component={Signup}
              hideNavBar={false}
              key='Signup'
              title='Signup'
            />
            <Scene
              component={Keys}
              key='Keys'
              title='Keys'
            />
            <Scene
              component={Connect}
              key='Connect'
              title='Connect'
            />
          </Scene>
        </Router>
    )
  }
}

