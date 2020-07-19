import { createStore, combineReducers } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import messageReducer from './reducers/messageReducer'
import filterReducer from './reducers/filterReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteService from './services/anecdotes'
import { addAnecdote } from './reducers/anecdoteReducer'


const reducer = combineReducers({ anecdotes: anecdoteReducer, message: messageReducer, filter: filterReducer })

const store = createStore(reducer, composeWithDevTools())

anecdoteService.getAll().then(anecdotes =>
  anecdotes.forEach(anecdotes => {
    console.log(anecdotes)
    store.dispatch(addAnecdote(anecdotes))
  })
)


export default store

