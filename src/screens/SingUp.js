import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React,{useState, useEffect} from 'react';
import {Input, Icon, Stack,Heading ,Box, useToast,FormControl} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth'
import {connect} from 'react-redux'
import {signUp} from '../action/auth'
import propTypes from 'prop-types'

const SingUp = ({signUp,navigation}) => {
  
  
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
      placement: "top",

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
  const dataSave= async()=>{
    auth().signInWithEmailAndPassword(email, password)
    .then((data) => {
        alertTossata('Sing in Successfully', '#4DD637') 
    })
    .catch((error) => {
     console.error(error,'error');
      if (error.code === 'auth/email-already-in-use') {
        alertTossata('That email address is already in use!', 'red')
      }
      if (error.code === 'auth/invalid-email') {
        alertTossata('That email address is invalid!','red');
      }
    })

  }
  const submit= ()=>{
    if (!password || !email ) {
      alertTossata('All Feild Required', 'red')
    }
    else if(password.length<6) {
      alertTossata('Password Must Be Greater Than  6 Char', 'red')
    } else{
      signUp({email, password})
     
     
    }
  }
  return (
    <View style={styles.continer}>
        <View style={styles.header}>
        <Heading size="md">Hello Again!</Heading>
        <Text style={{fontSize:18}}>Wellcome back you've</Text>
        <Text style={{fontSize:18}}>been missed!</Text>
       
        
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
                bg: "coolGray.100"
              }}
              _dark={{
                bg: "coolGray.100"
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
            style={{justifyContent:"center"}}
              value={password}
              onChangeText={value => setPassword(value)}
            />
          </FormControl>
        </Stack>
             
      </Stack>
       {/* ====form===== */} 
      
      <View style={{width:"80%", alignSelf:"center", paddingVertical:10}}>
        <TouchableOpacity onPress={()=>navigation.navigate('SingIn')}>
      <Text style={{textAlign:"right", color:"#6284f7", fontWeight:'bold'}}>Recovery Password</Text>
      </TouchableOpacity>
      </View>
    
        <TouchableOpacity onPress={submit} style={styles.singup}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
       {/* ====lower===== */}
      <View style={styles.lower}>
        <View ></View>

      </View>
       {/* ====lower===== */}
    </View>
  );
};

const mapDispatchToProps = {
  signUp: (data) => signUp(data)
}

SingUp.propTypes = {
  signUp: propTypes.func.isRequired
}


export default connect(null, mapDispatchToProps)(SingUp)

const styles = StyleSheet.create({
  continer: {
    flex: 1,
    
  },
  header:{
      height:'25%',
      width:'100%',
  
      justifyContent:"center",
      alignItems:"center"
  },
  lower:{
      height:'35%',
      width:'100%',
     
  },
  middle:{
      width:"100%",
      height:"40%"
  },
  singup: {
    marginTop:10,
    width: '80%',
    justifyContent: 'center',
    backgroundColor: '#6284f7',
    borderRadius: 25,
    alignItems: 'center',
    height: 50,
    alignSelf:'center'
  },
});
