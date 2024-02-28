import React from 'react';
import Home from './pages/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import PinEntry from './pages/PinEntry/PinEntry';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/home' element= {<Home/>}></Route>
        <Route path='/errorPage'element = {<ErrorPage/>}></Route>
        <Route path='/pinEntry'element = {<PinEntry/>}></Route>
      </Routes>

    </Router>
  );
};

export default App;