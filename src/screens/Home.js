import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Fab,
  Icon,
  Heading,
  Box,
  useToast,
  AlertDialog,
  Button,
  Center,
} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import moment from 'moment';

import {connect} from 'react-redux';
import {getTodo, deleteList} from '../action/todo';

import {useIsFocused} from '@react-navigation/native';
const Home = ({authState, todo, navigation, getTodo, deleteList}) => {
  const tday=moment().format('l')
  const hourAndMunit=moment().format('HH ')
  const hourAndMunit1=parseInt(moment().format('mm '))
  const totalHm =hourAndMunit*60 +hourAndMunit1
 console.log(typeof tday);
  
  const isFocused = useIsFocused();
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();
  const deleteAddd = id => {
    deleteList(id);
    //getTodo(authState.user.uid)
  };
  useEffect(() => {
    getTodo(authState.user.uid);
  }, [isFocused]);

   const dateDisplay=(data)=>{
    let d1 = moment("2018-05-19");
    let d2 = moment("2018-05-20");
    let d3 = moment("2018-05-22");
    if (d1.isAfter(d2)) {

      console.log(`${d1.format('ll')} is after ${d2.format('ll')}`);
  } else {
  
      console.log(`${d1.format('ll')} is before ${d2.format('ll')}`);
  }
   }
  const renderItemList = ({item}) => {
      //console.log(item);
    return (
      <>
        <View style={{width: '100%', height: 80, marginVertical: 15}}>
          <View />
          <View style={{height: '30%', width: '100%', paddingLeft: 10}}>
          
            <Text style={{fontWeight: '500', fontSize: 18, color: 'black'}}>
              {item.name}
            </Text>
          </View>
          <View style={{height: '70%', width: '100%', flexDirection: 'row'}}>
            <View
              style={{
                width: '75%',
                height: '100%',
                paddingLeft: 10,
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 15, color: 'black'}}>
                {moment(item.dateCheck).format('DD MMM')} {item.time}
               
              </Text>
            
              <Text>{ moment.duration(`00:${item.time}`).asSeconds()}</Text>
              {/* <Text>{moment.duration(item.time).asMinutes()}</Text> */}
              <Text>{moment(item.time, ['HH:mm']).format(
              'hh:mm A',
            )}</Text>
            </View>
            <View
              style={{
                width: '25%',
                height: '100%',
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('EditList', {data: item})}>
                <MaterialIcons
                  name="edit"
                  size={24}
                  color="#120E43"
                  style={{margin: 5}}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteAddd(item.id)}>
                <MaterialIcons
                  name="delete"
                  size={24}
                  color="red"
                  style={{margin: 5}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Center>
          <AlertDialog
            leastDestructiveRef={cancelRef}
            isOpen={isOpen}
            motionPreset={'fade'}>
            <AlertDialog.Content>
              <AlertDialog.Header fontSize="lg" fontWeight="bold">
                Delete Vendor
              </AlertDialog.Header>
              <AlertDialog.Body>
                Are you sure? You can't undo this action afterwards.
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button ref={cancelRef} onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  onPress={() => deleteAddd(item.id)}
                  ml={3}>
                  Delete{item.id}
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog>
        </Center>
      </>
    );
  };
  return (
    <>
      <View style={styles.container}>
        <StatusBar backgroundColor="#6284f7" barStyle="light-content" />
        <View style={styles.header}>
          <SimpleLineIcons name="arrow-left" size={20} color="white" />
          <MaterialCommunityIcons
            name="dots-vertical"
            size={24}
            color="white"
          />
        </View>
        <View style={{height:'30%', backgroundColor:'#6284f7', width:'100%',flexDirection:'row'}}>
          <View style={{width:'30%',  height:'100%', justifyContent:'flex-start',
          paddingTop:30,
          paddingLeft:30
         }}>
            <View style={{width:50, height:50,backgroundColor:'white', justifyContent:"space-around",alignItems:'center',
            borderRadius:30}}>
            <MaterialCommunityIcons  name="clipboard-text-outline" size={34} color="black" />
            </View>
            <Text style={{marginTop:10,fontSize:25,fontWeight:'900', color:'white'}}>ALL </Text>
            <Text style={{marginTop:1,fontSize:15, color:'white',fontWeight:"500"}}>{todo.length}  <Text>Tasks</Text></Text>
          </View>
          <View style={{width:'70%',  height:'100%', }}></View>
            

        </View>
        <View style={styles.lower}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={todo}
            renderItem={renderItemList}
            keyExtractor={todo => todo.id}
            contentContainerStyle={styles.listView}
          />
        </View>

        <Fab
          onPress={() => navigation.navigate('AddList')}
          renderInPortal={false}
          shadow={5}
          size="sm"
          style={{backgroundColor: '#6284f7'}}
          icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
        />
      </View>
    </>
  );
};
const mapStateToProps = state => ({
  authState: state.auth,
  todo: state.todo,
});

export default connect(mapStateToProps, {getTodo, deleteList})(Home);

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#6284f7'},
  header: {
    height: 50,
    width: '100%',
    backgroundColor: '#6284f7',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  lower: {
    height: '70%',
    backgroundColor: 'white',
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 10,
  },
  listView: {},
});
