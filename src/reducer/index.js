import {combineReducers} from 'redux'
import auth from './auth'
import post from './post'
import todo from './todo'

export default combineReducers({
    auth,
    post,
    todo
})