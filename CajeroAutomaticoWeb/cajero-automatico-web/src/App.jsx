import React from 'react';
import Home from './pages/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import PinEntry from './pages/PinEntry/PinEntry';
import Operations from './pages/Operations/Operations';
import Balance from './pages/Operations/Balance';
import Withdrawal from './pages/Operations/Withdrawal';
import OperationReport from './pages/Operations/OperationReport';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/home' element= {<Home/>}></Route>
        <Route path='/errorPage'element = {<ErrorPage/>}></Route>
        <Route path='/pinEntry'element = {<PinEntry/>}></Route>
        <Route path='/operations' element = {<Operations/>}></Route>
        <Route path='/operations/balance' element = {<Balance/>}></Route>
        <Route path='/operations/withdrawal' element = {<Withdrawal/>}></Route>
        <Route path='/operations/report' element = {<OperationReport/>}></Route>
      </Routes>

    </Router>
  );
};

export default App;