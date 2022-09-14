import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
import PageNotFound from './components/page-not-found';
import Layout from './components/layout';

function App() {

return (
<Routes>
<Route path="/" element={<Layout />}>
<Route index element={<Home />} />
<Route path='login' element={<Login />} />
<Route path="*" element={<PageNotFound />}/>
</Route>
</Routes>
);}

export default App;
