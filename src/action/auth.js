import auth from '@react-native-firebase/auth'
import Snackbar from 'react-native-snackbar'
import database from '@react-native-firebase/database'
import {useDispatch, connect} from 'react-redux'
import {SET_USER, IS_AUTHTHENTICATED} from './action.types'
import AsyncStorage from '@react-native-async-storage/async-storage';
export const signUp = (data) => async (dispatch) => {
   
    const { email, password,} = data

    auth().createUserWithEmailAndPassword(email, password)
    .then((data) => {
        console.log(data)
        console.log("User creation was succes")
     dispatch({
        type: IS_AUTHTHENTICATED,
        payload: true
      })
        // database()
        // .ref('/users/' + data.user.uid)
        // .set({
        //     name, 
        //     instaUserName,
        //     country,
        //     image,
        //     bio,
        //     uid: data.user.uid
        // })
        // .then(() => console.log('Data set success'))
        Snackbar.show({
            text: 'account created',
            textColor: 'white',
            backgroundColor: "#1b262c"
        })
    })
    .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            Snackbar.show({
                text: "That email address is already in use!",
                textColor: 'white',
                backgroundColor:'red'
            })
          }
      
          if (error.code === 'auth/invalid-email') {
            Snackbar.show({
                text: "That email address is invalid!",
                textColor: 'white',
                backgroundColor:'red'
            })
           
          }
       
       
    })
}

export const signIn = (data, navigation) => async (dispatch) => {
    //console.log(data)
    const {email, password} = data
   
    auth()
        .signInWithEmailAndPassword(email, password)
            .then( async(data) => {
                console.log(data.user,'dd');
                const user={
                    uid:data.user.uid,
                    email:data.user.email
                }
                
                await AsyncStorage.setItem('@user',JSON.stringify(user))
                setTimeout(()=>{
                    navigation.replace('Home')

                },1000)
                
                dispatch({
                    type: SET_USER,
                    payload: {
                        user:user
              
                      }
                  })
                 
                Snackbar.show({
                    text: "account signin",
                    textColor: "white",
                    backgroundColor: "#1b262c"
                })
               
            })
            .catch((error) => {
                console.error(error)
                Snackbar.show({
                    text: "Signin failed",
                    textColor: "white",
                    backgroundColor: "red"
                })
            })
}

export const signOut = () => async (dispatch) => {
    auth()
    .signOut()
    .then(() => {
        Snackbar.show({
            text: "SignOut success",
            textColor: "white",
            backgroundColor: "#1b262c"
        })
    })
    .catch((error) => {
        console.log(error)
        Snackbar.show({
            text: "Signout failed",
            textColor: "white",
            backgroundColor: "red"
        })
    })
}