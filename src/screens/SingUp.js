import {
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  View,
  ScrollView,
  Dimensions
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  Input,
  Icon,
  Stack,
  Heading,
  Box,
  useToast,
  FormControl,
} from 'native-base';
const windowHeight = Dimensions.get('window').height;

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
import {connect} from 'react-redux';
import {signUp} from '../action/auth';
import propTypes from 'prop-types';

const SingUp = ({signUp, navigation}) => {
  const [show, setShow] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const checkEmail = value => {
    let rjx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!rjx.test(value)) {
      setError('Please write email in valid format');
    } else {
      setError('');
      setEmail(value);
    }
  };
  const toast = useToast();
  const alertTossata = (msg, color) => {
    return toast.show({
      duration: 2000,
      placement: 'top',

      render: () => {
        return (
          <Box
            style={{
              height: 50,
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              backgroundColor: color,
            }}>
            <Text style={{color: 'white', fontSize: 20}}>{msg}</Text>
          </Box>
        );
      },
    });
  };

  const submit = () => {
    if (!password || !email) {
      alertTossata('All Feild Required', 'red');
    } else if (password.length < 6) {
      alertTossata('Password Must Be Greater Than  6 Char', 'red');
    } else {
      signUp({email, password});
    }
  };
  return (
      <>
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.continer}>
        <StatusBar hidden={true} />
        <View style={styles.header}>
          <Heading size="md">Hello Register Here!</Heading>
          <Text style={{fontSize: 18}}>Wellcome back you've</Text>
          <Text style={{fontSize: 18}}>been missed!</Text>
        </View>
        <View style={styles.middle}>
          {/* ====form===== */}
          <Stack space={2} w="100%" alignItems="center">
            <Stack space={4} w="80%" alignItems="center">
              <FormControl>
                <FormControl.Label
                  _text={{
                    bold: true,
                  }}>
                  Email
                </FormControl.Label>
                <Input
                  size="lg"
                  placeholder="Email"
                  variant="rounded"
                  shadow={2}
                  _light={{
                    bg: 'coolGray.100',
                  }}
                  _dark={{
                    bg: 'coolGray.100',
                  }}
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="person" />}
                      size={5}
                      ml="2"
                      color="muted.400"
                    />
                  }
                  keyboardType="email-address"
                  onChangeText={value => checkEmail(value)}
                />
                {error ? <Text style={{color: 'red'}}>{error}</Text> : null}
              </FormControl>
            </Stack>
            <Stack space={4} w="80%" alignItems="center">
              <FormControl>
                <FormControl.Label
                  _text={{
                    bold: true,
                  }}>
                  Password
                </FormControl.Label>
                <Input
                  shadow={2}
                  _light={{
                    bg: 'coolGray.100',
                  }}
                  _dark={{
                    bg: 'coolGray.100',
                  }}
                  variant="rounded"
                  placeholder="Password"
                  type={show ? 'text' : 'password'}
                  InputRightElement={
                    <Icon
                      as={
                        <MaterialIcons
                          name={show ? 'visibility' : 'visibility-off'}
                        />
                      }
                      size={5}
                      mr="2"
                      color="muted.400"
                      onPress={() => setShow(!show)}
                    />
                  }
                  size="lg"
                  px="3"
                  style={{justifyContent: 'center'}}
                  value={password}
                  onChangeText={value => setPassword(value)}
                />
              </FormControl>
            </Stack>
          </Stack>
          {/* ====form===== */}

          <View
            style={{width: '80%', alignSelf: 'center', paddingVertical: 10}}>
          
              <Text
                style={{
                  textAlign: 'right',
                  color: '#6284f7',
                  fontWeight: 'bold',
                }}>
                
              </Text>
           
          </View>

          <TouchableOpacity onPress={submit} style={styles.singup}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
        {/* ====lower===== */}
        <View style={styles.lower}>
          <View style={styles.lowerTop} >
              <Text style={{fontSize:15, fontWeight:'600'}}>Or connect with</Text>
          </View>
          <View style={styles.lowerMiddle}>
            <View style={styles.lowerMiddleBox}>
              <Image
                style={styles.logoImage}
                source={require('../../src/assets/gg.png')}
              />
            </View>
            <View style={styles.lowerMiddleBox} >
            <Image
                style={styles.logoImage}
                source={require('../../src/assets/ap.png')}
              />
            </View>
            
            <View style={styles.lowerMiddleBox} >
            <Image
                style={styles.logoImage}
                source={require('../../src/assets/pp.png')}
              />
            </View>
          </View>
          <View style={styles.lowerLower}>
                <Text style={{fontSize:15, fontWeight:'600'}}>
                Already a member ?
                  </Text>
                   <TouchableOpacity onPress={()=>navigation.navigate('SingIn')}>

                   
                 <Text style={{fontSize:15, fontWeight:'600', color:'#6284f7',marginLeft:5}}>
                 Login Here
                </Text>
                </TouchableOpacity>
                
          </View>
        </View>
        {/* ====lower===== */}
      </View>
     
    </ScrollView>
    </>
  );
};

const mapDispatchToProps = {
  signUp: data => signUp(data),
};

SingUp.propTypes = {
  signUp: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(SingUp);

const styles = StyleSheet.create({
  continer: {
   height:windowHeight,
    backgroundColor: '#e5f2f9',
  },
  header: {
    height: '25%',
    width: '100%',

    justifyContent: 'center',
    alignItems: 'center',
  },
  lower: {
    height: '35%',
    width: '100%',
  },
  middle: {
    width: '100%',
    height: '40%',
  },
  singup: {
    marginTop: 10,
    width: '80%',
    justifyContent: 'center',
    backgroundColor: '#6284f7',
    borderRadius: 25,
    alignItems: 'center',
    height: 50,
    alignSelf: 'center',
  },
  lowerTop: {width: '100%', height: '15%', justifyContent:"center",
alignItems:"center"},
  lowerMiddle: {
    width: '100%',
    height: '70%',
   
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  lowerMiddleBox: {
    width: 100,
    height: 80,
    borderRadius: 10,
    borderWidth: 2.5,
    borderColor: 'white',
    justifyContent:"center",
    alignItems:'center'
  },
  logoImage: {
    width: 50,
    height: 50,
    resizeMode: 'center',
  },
  lowerLower:{
      width:'100%',
      height:'15%',
      justifyContent:"center",
      alignItems:"flex-start",
      flexDirection:'row',
      
      
  }
});
