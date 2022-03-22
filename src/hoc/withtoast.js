import React from 'react';
import {
    useToast,
    Box,
  
  } from 'native-base';


export const alerTast=()=>{
 
        const toast = useToast();
        return toast.show({
          duration: 3000,
    
          render: () => {
            return (
              <Box
                style={{
                  height: 50,
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  backgroundColor: "red",
                }}>
                <Text style={{color: 'white', fontSize: 20}}>adafadsfsd</Text>
              </Box>
            );
          },
        });
      };


 