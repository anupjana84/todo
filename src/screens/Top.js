import {View, StyleSheet,StatusBar, ActivityIndicator, Text, } from 'react-native';
import React,{useEffect} from 'react'
import {useDispatch, connect} from 'react-redux'
import { SET_USER,IS_AUTHTHENTICATED } from '../action/action.types';

import AsyncStorage from '@react-native-async-storage/async-storage';



const Top = ({navigation}) => {

    const dispatch = useDispatch();
    

    const onAuthStateChanged = async () => {
      const isRegister = await AsyncStorage.getItem('@user');
      const data = isRegister != null ? JSON.parse(isRegister) : null;
      
      if (data === null) {
        navigation.replace('SingUp')
      }else{
        
        dispatch({
          type: SET_USER,
          payload: {
          user:data,

        }
       }
     
       )
       navigation.replace('Home')
      }
        
    };
        useEffect(()=>{
          onAuthStateChanged()
        },[])
  return (
    <>
        <StatusBar backgroundColor="#6284f7" barStyle="light-content" />
    <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
     <ActivityIndicator size={80} color={'#6284f7'} />
    </View>
    </>
  )
}
const mapStateToProps = (state) => ({
    authState: state.auth
  })
export default connect(mapStateToProps)(Top)

