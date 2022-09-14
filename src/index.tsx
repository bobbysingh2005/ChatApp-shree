import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import App from './App';

import '../src/style.scss';
// import 'bootstrap/dist/js/bootstrap';
import '@popperjs/core';

ReactDOM.render(
<BrowserRouter>
<App />
</BrowserRouter>
, document.getElementById('root')
);
