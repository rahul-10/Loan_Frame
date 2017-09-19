import React, { Component } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Router, Scene } from 'react-native-router-flux';

EStyleSheet.build({
  $textColor: 'green' // variable
});

import Splash from './splash/Splash';
import Registration from './registration/Registration';
import ShowDetails from './registration/ShowDetails';

export default class Navigator extends Component {
    render() {
        return (
          <Router>
            <Scene key="root">
                <Scene key="splash" component={Splash} hideNavBar={true} initial />
                <Scene key="registration" component={Registration} hideNavBar={true}   />
                <Scene key="showDetails" component={ShowDetails} hideNavBar={true}  />
            </Scene>
          </Router>
        )
    }
}
