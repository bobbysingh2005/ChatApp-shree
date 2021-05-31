import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

// import {Container, Button} from '@material-ui/core';

import LoginPage from './pages/login';
import HomePage from './pages/home';

function App() {
  return (
<Suspense fallback={Loading} >
<Router>
<Switch>
<Route exec path="/home" component={HomePage} />
<Route exect path="/login" component={LoginPage} />
<Redirect from="/" to="/home" />
</Switch>
</Router>
</Suspense>
);
}

export default App;
  