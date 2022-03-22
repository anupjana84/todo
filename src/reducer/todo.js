
import {CREATE_TODO, LOAD_TODO,REMOVE_TODO,UPDATE_TODO} from '../action/action.types'

export default  (state = [], action) => {
    switch (action.type) {
        case LOAD_TODO: {
            return action.payload.list
        }
        case CREATE_TODO: {
            let transactions = [...state]
            transactions.unshift(action.payload.list)
            return transactions
        }
        case REMOVE_TODO: {
            let todo = [...state]
            return todo.filter(todo => {
                return todo.id !== action.payload.id
            })
        }
        case UPDATE_TODO: {
            let transactions = [...state]
            return transactions.map(tran => {
                if (tran._id === action.payload.transaction._id) {
                    return action.payload.transaction
                }
                return tran
            })
        }
        default: return state
    }
}

