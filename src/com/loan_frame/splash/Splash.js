import React, {Component} from  'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
  AsyncStorage,
  ActivityIndicator,
  AppState
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import { Actions } from 'react-native-router-flux';

export default class Splash extends Component {
    constructor(props){
        super(props);
        this.state = {
            animating : true
        }
    }
    componentDidMount(){
        setTimeout(() => { this.setState({animating:false}); Actions.registration(); }, 3000);

    }

    render(){
        return(
            <View style = {estyles.container} >
                <Image style = {estyles.image} source = {require('../images/splash.png')} >
                    <View style = {estyles.ActivityIndicator}>
                        <ActivityIndicator animating={this.state.animating} style={{height: 200}} color='#FFFFFF' size="large" />
                    </View>
                </Image>
            </View>
        );
    }
}

const estyles = EStyleSheet.create({
    container:{
        height:"100%",
        width:"100%",
        alignItems:"center",
        justifyContent:"center"
    },
    image:{
        height:"100%",
        width:"100%",
        resizeMode:"stretch"
    },
    ActivityIndicator:{
        width:'100%',
        height:"100%",
        justifyContent:'center',
        backgroundColor:'rgba(0,0,0,0)',
        alignItems:"center"
    }
})
