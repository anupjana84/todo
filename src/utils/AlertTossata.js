import { StyleSheet, Text, View } from 'react-native'
import React from 'react'


import {
    useToast,
    Box,
    Button
  
  } from 'native-base';
  

 
  
  const AlertTossata = () => {
    const toast = useToast();
    const alertTossata = (msg, color) => {
      return(
         toast.show({
          description: 'Hello world'
        })
            
          
      )
        
      
     
      // return toast.show({
      //   duration: 3000,
  
      //   render: () => {
      //     return (
      //       <Box
      //         style={{
      //           height: 50,
      //           padding: 10,
      //           justifyContent: 'center',
      //           alignItems: 'center',
      //           borderRadius: 10,
      //           backgroundColor: "red",
      //         }}>
      //         <Text style={{color: 'white', fontSize: 20}}>amida</Text>
      //       </Box>
      //     );
      //   },
      // });
    };
    return (
      <Text>
        {alertTossata()}
      </Text>
    )
  }
  
  export default AlertTossata
  
  const styles = StyleSheet.create({})