import {StatusBar} from 'react-native';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home';
import SingIn from './screens/SingIn';
import SingUp from './screens/SingUp';
import AddList from './screens/AddList';
import EditList from './screens/EditList';
import Top from './screens/Top';

import {LogBox} from 'react-native';
LogBox.ignoreLogs(['NativeBase:']);


import { connect} from 'react-redux'


const App = ({authState}) => {

 
  const Stack = createNativeStackNavigator();
  return (
    
      <NavigationContainer>
       
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
            
             <Stack.Screen name="Top" component={Top} />
              
                  <Stack.Screen name="Home" component={Home} />
                   <Stack.Screen name="AddList" component={AddList} />
                  <Stack.Screen name="EditList" component={EditList} />
        
                <Stack.Screen name="SingUp" component={SingUp} />  
                 <Stack.Screen name="SingIn" component={SingIn} />
                 
        </Stack.Navigator>
      </NavigationContainer>
    
  );
};
const mapStateToProps = (state) => ({
  authState: state.auth
})

export default connect(mapStateToProps)(App)
