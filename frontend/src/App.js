import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Dashboard from './Pages/Dashboard'
import ProjectDetails from './Pages/projectDetails'
import Nav from './components/nav'


function App() {

  return (

      <div className="App">
        <Router>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/project' element={<ProjectDetails />} />
          </Routes>
        </Router>
      </div>

  );
}

export default App;
