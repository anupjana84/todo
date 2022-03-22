import {LOAD_TODO, CREATE_TODO, REMOVE_TODO} from './action.types';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';

export const getTodo = data => async dispatch => {
  
  firestore()
    .collection('todoList')
    .where('userId', '==', data)
    .get()
    .then(querySnapshot => {
      let list = [];

      querySnapshot.forEach(doc => {
        const {name, time, userId,pdate,category,dateCheck } = doc.data();
        
       
        list.push({id: doc.id, name, time, userId,pdate,category,seconds:'',dateCheck});
      });

      dispatch({
        type: LOAD_TODO,
        payload: {
          list: list,
        },
      });
    });
};
export const addTodo = (data, navigation) => async dispatch => {
  console.log(data.dateCheck);
  const {name, time,pdate,category,dateCheck, userId} = data;
  firestore()
    .collection('todoList')
    .add({
      name: name,
      time: time,
      pdate:pdate,
      category:category,
      dateCheck:dateCheck,
      userId: userId,
    })
    .then(data => {
        Snackbar.show({
            text: 'Add Successfully',
            textColor: 'white',
            backgroundColor: '#E6425E',
          });
      navigation.navigate('Home');
    })
    .catch(err => {
      console.log(err);
    });
};
export const deleteList = id => async dispatch => {
  firestore()
    .collection('todoList')
    .doc(id)
    .delete()
    .then(data => {
      dispatch({
        type: REMOVE_TODO,
        payload: {id: id},
      });
      Snackbar.show({
        text: 'Remove Successfully',
        textColor: 'white',
        backgroundColor: '#E6425E',
      });
    })
    .catch(error => {
      Snackbar.show({
        text: 'Error removing document',
        textColor: 'white',
        backgroundColor: '#E6425E',
      });
    });
};
