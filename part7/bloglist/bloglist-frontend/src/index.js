import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter as Router, Route } from 'react-router-dom'

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Route component={App} />
    </Router>
  </Provider>
)
ReactDOM.render(<Root store={store} />, document.getElementById('root'))

