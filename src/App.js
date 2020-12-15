import React from 'react';
import {Switch, Route} from 'react-router-dom'

import Main from './Main'
import Movie from './Movie'

// This app.js is in charge of rendering some component depending on the route you are in
// It is also being sure that each component rendered will receive the react-router props

const App = () => (
  <div>
    <Switch>
      <Route
        exact path='/random'
        render={props => <Movie {...props} />}
      />
      <Route
        exact path='/'
        render={props => <Main {...props} />}
      />
    </Switch>
  </div>
)

export default App;
