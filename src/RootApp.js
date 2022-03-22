import React,{useEffect} from 'react'
import store from './store'
import {Provider} from 'react-redux'
import {NativeBaseProvider} from 'native-base';
import App from './App'



const RootApp = () => {
    return(
        <Provider store={store}>
          
            <NativeBaseProvider>
            <App />
            </NativeBaseProvider>
        </Provider>
    )
}

export default RootApp