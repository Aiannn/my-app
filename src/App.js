import './App.css';
import { React } from 'react'
import AppHeader from './components/AppHeader';
import FormField from './components/FormField';
import Rud from './components/Rud';
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import ListOfUsers from './components/ListOfUsers';

function App() {
  return (
    <>
      <AppHeader />
      <Routes>
        <Route path='/new' element={<div className='form-container'><FormField /></div>} />
        <Route path='/findAll' element={<div className='form-container'><ListOfUsers /></div>} />
        <Route path='/alter' element={<Rud />} />
      </Routes>
    </>
  );
}

export default App;
