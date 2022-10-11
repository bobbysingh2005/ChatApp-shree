import React from 'react';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import DefaultLayout from "./components/Default-layout";
import Home from "./Home";
import Login from "./Login";
import PageNotFound from './Page-not-found';

function App() {
return (
<BrowserRouter>
<Routes>
<Route path="/" element={<DefaultLayout />} >
<Route index element={<Home />} />
<Route path="home" element={<Home />} />
<Route path="login" element={<Login />} />
<Route path="*" element={<PageNotFound />} />
</Route>
<Route path="*" element={<PageNotFound />} />
</Routes>
</BrowserRouter>
)};//end;

export default App;
