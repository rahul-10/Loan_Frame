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
import ModalDropdown from 'react-native-modal-dropdown';
import ImagePicker from 'react-native-image-crop-picker';
import { DatePickerDialog } from 'react-native-datepicker-dialog';
import moment from 'moment';
import Datastore from 'react-native-local-mongodb' ;
userDetails = new Datastore({ filename: 'asyncStorageKey', autoload: true });

nthis = '';

class Registration extends Component {
    constructor(props){
        super(props);
        nthis = this;
        this.fetchSavedDetails();
        this.state = {
            firstName:'',
            lastName: '',
            gender : 'Male',
            genderList: ['Male', 'Female', 'Other'],
            dob: '',
            dobText: '',
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            country: '',
            picPath:'',
            error:'',
            modalVisible:false,
        }
    }

    fetchSavedDetails(){
        userDetails.find({_id : 111}, function (err, docs) {
            if(docs.length > 0){
                nthis.setState({
                    firstName: docs[0].firstName,
                    lastName: docs[0].lastName,
                    gender : docs[0].gender,
                    dobText: docs[0].dobText,
                    addressLine1: docs[0].addressLine1,
                    addressLine2: docs[0].addressLine2,
                    city: docs[0].city,
                    state: docs[0].state,
                    country: docs[0].country,
                    picPath: docs[0].picPath,
                })
            }
        });
    }

    createAccount(){
        const { firstName, lastName, gender, dobText, addressLine1, addressLine2, city, state, country, picPath } = this.state;

       if(firstName.length <= 0   )
            this.setState({error:"First Name can't be blank"});
        else if(lastName.length <= 0   )
            this.setState({error:"Last Name can't be blank"});
        else if(dobText.length <= 0   )
            this.setState({error:"Date of Birth can't be blank"});
        else if(addressLine1.length <= 0   )
            this.setState({error:"Address Line 1 can't be blank"});
        else if(addressLine2.length <= 0   )
            this.setState({error:"Address Line 2 can't be blank"});
        else if(city.length <= 0   )
            this.setState({error:"City can't be blank"});
        else if(state.length <= 0   )
            this.setState({error:"State can't be blank"});
        else if(country.length <= 0   )
            this.setState({error:"Country can't be blank"});
        else{
            this.setState({error:""});
            Actions.showDetails({firstName:firstName, lastName:lastName, gender:gender, dobText:dobText, addressLine1:addressLine1, addressLine2:addressLine2,city:city, state:state, country: country, picPath:picPath});

            userDetails.count({}, function (err, count) {
                var doc = {
                    _id : 111,
                    firstName:firstName,
                    lastName: lastName,
                    gender : gender,
                    dobText:dobText,
                    addressLine1: addressLine1,
                    addressLine2: addressLine2,
                    city: city,
                    state: state,
                    country: country,
                    picPath:picPath,
                }
                if(count > 0){
                    userDetails.update({ _id: 111 }, { $set: doc }, { multi: true }, function (err, numReplaced) {   // Callback is optional
                        console.log('numReplaced  : ' + numReplaced);
                    });
                }else {
                    userDetails.insert(doc, function (err, newDoc) {
                        console.log(newDoc);
                    });
                }
            });
        }
    }

    openPicker(){
        ImagePicker.openPicker({
            width: 325,
            height: 215,
            cropping: true
        }).then(image => {
            this.setState({
                modalVisible: false,
                picPath: image.path,
            });
        }).catch(error => {
            //console.log(error);
            this.setState({
                modalVisible: false,
            });
        });
    }

    openCamera() {
        ImagePicker.openCamera({
          width: 325,
          height: 215,
          cropping: true
        }).then(image => {
            this.setState({
                modalVisible: false,
                picPath: image.path,
            });
        }).catch(error => {
            console.log(error);
            this.setState({
                modalVisible: false,
            });
        });
    }

    modal(){
        return(
            <Modal
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {}}
                >
                <View style={estyles.modalcontainer}  >
                    <View style = {estyles.modalsubContainer}>
                        <Text style = {{fontWeight: 'bold' }}>Add Photo</Text>
                        <TouchableOpacity onPress={ () => this.openCamera() } >
                            <Text>Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ () => this.openPicker() } >
                            <Text>Choose from Gallery</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ () => {this.setState({modalVisible:false})} } >
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }

    setProfile(){
        return(
            (this.state.picPath)?<Image style = {estyles.image} source={{uri: this.state.picPath}} />:<Text style = {{fontSize:16}}>Add Picture</Text>
        )
    }

    onSelect(index, value){
        nthis.setState({gender : value});
    }

    renderRow(rowData, rowID, highlighted) {
        return (
            <TouchableOpacity  style = {{height:30, width:70,justifyContent:'center',alignItems:'center'}} >
                 <Text >{rowData}</Text>
            </TouchableOpacity>
        );
    }

    onJourneyDatePress = () => {
        let dob = this.state.dob;
        if(!dob || dob == null){
          dob = new Date();
          this.setState({ dob: dob});
        }
        this.refs.journeyDialog.open({
          date: dob,
          maxDate: new Date()
        });
    }

    onJourneyDatePicked = (date) => {
        this.setState({
          dob: date,
          dobText: moment(date).format('DD MMM, YYYY')
        });
    }

    body(){
        return(
            <ScrollView  showsVerticalScrollIndicator = {false} >
                <TouchableOpacity onPress = {()=>{this.setState({modalVisible:true})}}>
                    <View style = {estyles.imageContainer}>
                        {this.setProfile()}
                    </View>
                </TouchableOpacity>


                {  /* First Name */  }
                <View style = {estyles.inputFieldContainer}>
                    <Text style ={{fontSize:14,marginBottom:3, color:'#363636', fontWeight:'500'}} >First Name : </Text>
                    <TextInput
                        underlineColorAndroid='transparent'
                        autoCorrect = {false}
                        autoCapitalize = 'none'
                        style={estyles.input}
                        onChangeText={(text) => this.setState({firstName:text})}
                        value={this.state.firstName}
                      />
                </View>
                {  /* Last Name */  }
                <View style = {estyles.inputFieldContainer}>
                    <Text style ={{fontSize:14,marginBottom:3, color:'#363636', fontWeight:'500'}} >Last Name : </Text>
                    <TextInput
                        underlineColorAndroid='transparent'
                        autoCorrect = {false}
                        autoCapitalize = 'none'
                        style={estyles.input}
                        onChangeText={(text) => this.setState({lastName:text})}
                        value={this.state.lastName}
                      />
                </View>
                {  /* DOB  */  }
                <View style = {estyles.inputFieldContainer}>
                    <Text style ={{fontSize:14,marginBottom:3, color:'#363636', fontWeight:'500'}} >Date of Birth : </Text>
                    <TouchableOpacity onPress={this.onJourneyDatePress.bind(this)}  >
                        <View style={estyles.otherInput} >
                            <Text>{this.state.dobText}</Text>
                            <Image style = {{width: 17, height: 17, resizeMode:'contain', tintColor:'#015697'}} source = {require('../images/fa-custom-calendar-grey.png')} />
                        </View>
                    </TouchableOpacity>
                </View>

                {  /* Gender */  }
                <View style = {estyles.inputFieldContainer}>
                    <Text style ={{fontSize:14,marginBottom:3, color:'#363636', fontWeight:'500'}} >Gender : </Text>
                    <ModalDropdown
                        options={this.state.genderList}
                        onSelect = {this.onSelect}
                        dropdownStyle = {{height: this.state.genderList.length*30 , width: 70}}
                        renderRow={this.renderRow.bind(this)} >
                        <View style = {[estyles.otherInput]}>
                            <Text>{this.state.gender}</Text>
                            <Image style={{height:10, width:10,resizeMode:'contain', tintColor:'#6A92C3'}} source = {require('../images/arrow-icon.png')} />
                        </View>
                    </ModalDropdown>
                </View>

                {  /* Address Line 1 */  }
                <View style = {estyles.inputFieldContainer}>
                    <Text style ={{fontSize:14,marginBottom:3, color:'#363636', fontWeight:'500'}} >Address Line 1 : </Text>
                    <TextInput
                        underlineColorAndroid='transparent'
                        autoCorrect = {false}
                        autoCapitalize = 'none'
                        style={estyles.input}
                        onChangeText={(text) => this.setState({addressLine1:text})}
                        value={this.state.addressLine1}
                      />
                </View>

                {  /* Address Line 2 */  }
                <View style = {estyles.inputFieldContainer}>
                    <Text style ={{fontSize:14,marginBottom:3, color:'#363636', fontWeight:'500'}} >Address Line 2 : </Text>
                    <TextInput
                        underlineColorAndroid='transparent'
                        autoCorrect = {false}
                        autoCapitalize = 'none'
                        style={estyles.input}
                        onChangeText={(text) => this.setState({addressLine2:text})}
                        value={this.state.addressLine2}
                      />
                </View>

                {  /* City */  }
                <View style = {estyles.inputFieldContainer}>
                    <Text style ={{fontSize:14,marginBottom:3, color:'#363636', fontWeight:'500'}} >City : </Text>
                    <TextInput
                        underlineColorAndroid='transparent'
                        autoCorrect = {false}
                        autoCapitalize = 'none'
                        style={estyles.input}
                        onChangeText={(text) => this.setState({city:text})}
                        value={this.state.city}
                      />
                </View>

                {  /* State */  }
                <View style = {estyles.inputFieldContainer}>
                    <Text style ={{fontSize:14,marginBottom:3, color:'#363636', fontWeight:'500'}} >State : </Text>
                    <TextInput
                        underlineColorAndroid='transparent'
                        autoCorrect = {false}
                        autoCapitalize = 'none'
                        style={estyles.input}
                        onChangeText={(text) => this.setState({state:text})}
                        value={this.state.state}
                      />
                </View>

                {  /* Country */  }
                <View style = {estyles.inputFieldContainer}>
                    <Text style ={{fontSize:14,marginBottom:3, color:'#363636', fontWeight:'500'}} >Country : </Text>
                    <TextInput
                        underlineColorAndroid='transparent'
                        autoCorrect = {false}
                        autoCapitalize = 'none'
                        style={estyles.input}
                        onChangeText={(text) => this.setState({country:text})}
                        value={this.state.country}
                      />
                </View>

                <Text style= {{marginTop:10, alignSelf:'center',color:'red'}}>{this.state.error}</Text>
                <TouchableOpacity onPress = {this.createAccount.bind(this)} style = {[estyles.button, {backgroundColor:'#000096'}]}>
                    <Text style = {{fontWeight:'600', fontSize: 14, color: '#FFFFFF'}}>SAVE DETAILS</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }


    render() {
        return (
            <View style = {estyles.container} >
                {this.modal()}
                {this.body()}

                <DatePickerDialog ref="journeyDialog" onDatePicked={this.onJourneyDatePicked.bind(this)} />
            </View>
        );
    }
}

const estyles = EStyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#d6d6d6'
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
    inputFieldContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginHorizontal:10,
        marginTop:8
    },
    otherInput: {
        width:220,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#FBFCFF',
        borderColor:'#D7D8DA',
        marginBottom:1,
        paddingLeft:5,
        paddingRight:5,
        height: 30,
        borderWidth: 1,
        borderRadius:5,
    },
    input: {
        width:220,
        backgroundColor:'#FBFCFF',
        color:'#363636',
        borderColor:'#D7D8DA',
        marginBottom:1,
        paddingLeft:5,
        height: 30,
        borderWidth: 1,
        borderRadius:5,
        fontSize:14
    },
    button: {
        alignSelf: 'center',
        padding: 10,
        justifyContent:'center',
        alignItems:'center',
        width:'55%',
        borderRadius: 30,
        margin: '5%',

    },
    modalcontainer : {
       flex:1,
       justifyContent:'center',
       alignItems: 'center',
       width: '100%',
       backgroundColor :'rgba(0, 0, 0, 0.5)'
    },
    modalsubContainer : {
      height: '35%',
      width: '90%',
      backgroundColor : "#FFFFFF",
      borderRadius : 5,
      paddingLeft: '5%',
      justifyContent: 'space-around'
    },
});
export default Registration ;
