import { createStore,combineReducers,applyMiddleware } from 'redux'
import anecdotesReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
const reducer = combineReducers({ anecdotes:anecdotesReducer, notification:notificationReducer, filter:filterReducer })
const store = createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))
export default store