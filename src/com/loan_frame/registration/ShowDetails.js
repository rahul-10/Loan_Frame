import React, {Component} from  'react';

import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import { Actions } from 'react-native-router-flux';

class showDetails extends Component {
    constructor(props){
        super(props);
    }

    setProfile(){
        return(
            <Image style = {estyles.image} source={{uri: this.props.picPath}} />
        )
    }

    render() {
        const { firstName, lastName, gender, dobText, addressLine1, addressLine2, city, state, country } = this.props;
        return (
            <ScrollView style = {estyles.container} >
                <Text style = {{fontSize:20, fontWeight:'600', textAlign:'center', color:'#363636', marginTop:30}} >User Details</Text>

                <View style = {estyles.imageContainer}>
                    {this.setProfile()}
                </View>

                <View style = {{flexDirection:'row',  marginTop:10}} >
                    <Text style ={{width:120,fontSize:14, color:'#363636', fontWeight:'500'}} >First Name : </Text>
                    <Text style = {{width:230, fontSize:16}}>{firstName}</Text>
                </View>

                <View style = {{flexDirection:'row',  marginTop:10}} >
                    <Text style ={{width:120,fontSize:14, color:'#363636', fontWeight:'500'}} >Last Name : </Text>
                    <Text style = {{width:230, fontSize:16}}>{lastName}</Text>
                </View>

                <View style = {{flexDirection:'row',  marginTop:10}} >
                    <Text style ={{width:120,fontSize:14, color:'#363636', fontWeight:'500'}} >Gender : </Text>
                    <Text style = {{width:230, fontSize:16}}>{gender}</Text>
                </View>

                <View style = {{flexDirection:'row',  marginTop:10}} >
                    <Text style ={{width:120,fontSize:14, color:'#363636', fontWeight:'500'}} >Date of Birth : </Text>
                    <Text style = {{width:230, fontSize:16}}>{dobText}</Text>
                </View>

                <View style = {{flexDirection:'row',  marginTop:10}} >
                    <Text style ={{width:120,fontSize:14, color:'#363636', fontWeight:'500'}} >Address Line 1 : </Text>
                    <Text style = {{width:230, fontSize:16}}>{addressLine1}</Text>
                </View>

                <View style = {{flexDirection:'row',  marginTop:10}} >
                    <Text style ={{width:120,fontSize:14, color:'#363636', fontWeight:'500'}} >Address Line 2 : </Text>
                    <Text style = {{width:230, fontSize:16}}>{addressLine2}</Text>
                </View>

                <View style = {{flexDirection:'row',  marginTop:10}} >
                    <Text style ={{width:120,fontSize:14, color:'#363636', fontWeight:'500'}} >City : </Text>
                    <Text style = {{width:230, fontSize:16}}>{city}</Text>
                </View>

                <View style = {{flexDirection:'row',  marginTop:10}} >
                    <Text style ={{width:120,fontSize:14, color:'#363636', fontWeight:'500'}} >State : </Text>
                    <Text style = {{width:230, fontSize:16}}>{state}</Text>
                </View>

                <View style = {{flexDirection:'row',  marginTop:10}} >
                    <Text style ={{width:120,fontSize:14, color:'#363636', fontWeight:'500'}} >Country : </Text>
                    <Text style = {{width:230, fontSize:16}}>{country}</Text>
                </View>


                <TouchableOpacity onPress = {() => Actions.pop()} style = {[estyles.button, {backgroundColor:'#000096'}]}>
                    <Text style = {{fontWeight:'600', fontSize: 14, color: '#FFFFFF'}}>UPDATE DETAILS</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}

const estyles = EStyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingHorizontal:10,
        backgroundColor: '#d6d6d6',
    },
    imageContainer:{
        height: 150,
        width:150,
        borderRadius:100,
        borderWidth:1,
        backgroundColor:'#E3EEFF',
        borderColor:'#BBBEC5',
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        marginVertical:20
    },
    image:{
        height:'100%',
        width:'100%',
        borderRadius:75,
        resizeMode:'cover'
    },
    button: {
        alignSelf: 'center',
        padding: 10,
        justifyContent:'center',
        alignItems:'center',
        width:'55%',
        borderRadius: 20,
        marginTop: 50,
        marginBottom:20

    },
});
export default showDetails ;
