import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Entypo from 'react-native-vector-icons/Entypo';
import {Heading, TextArea} from 'native-base';
const windowHeight = Dimensions.get('window').height;
import {useDispatch, connect} from 'react-redux';
import { addTodo } from '../action/todo';
const EditList = ({navigation,route}) => {
  console.log(route.params.data);
  return (
    <View style={styles.container}>
   
    <View style={styles.header}>
      <View style={styles.headerLeft} />
      <View style={styles.headerMiddle}>
        <Heading size="sm">Edit Task</Heading>
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Entypo name="cross" size={28} color="black" />
        </TouchableOpacity>
      </View>
    </View>
    <View style={styles.lower}>
      <View style={{height: 80}} />
      <Heading size="sm">What are you planning</Heading>
      <TextArea
        style={styles.textArra}
        borderColor="cyan.500"
        borderWidth="0"
        borderBottomWidth="0.2"
        size="2xl"
        p="0"
        borderBottomColor="blueGray.500"
      />
      <View style={styles.listStyle}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            paddingVertical: 7,
          }}>
          <Entypo name="cross" size={24} color="black" />
          <Text> Add</Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            paddingVertical: 7,
          }}>
          <Entypo name="cross" size={24} color="black" />
          <Text> Add</Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            paddingVertical: 7,
          }}>
          <Entypo name="cross" size={24} color="black" />
          <Text> Add</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.createButton} >
        <Text style={{color: 'white', fontWeight: '900', fontSize: 20}}>
          Create
        </Text>
      </TouchableOpacity>
    </View>
  </View>
  )
}

export default EditList


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
  },
  headerLeft: {
    height: '100%',
    width: '10%',
  },
  headerMiddle: {
    height: '100%',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRight: {
    height: '100%',
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lower: {
    height: windowHeight - 50,
    paddingHorizontal: 20,
  },
  textArra: {
    borderBottomColor: 'white',
  },
  listStyle: {
     paddingVertical:20
  },
  createButton: {
    marginTop: 15,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6284f7',
    borderRadius: 25,
  },
});
