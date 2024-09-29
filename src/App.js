import React from'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './components/NotFound';
import FormData from './pages/FormData';
import BuinessPage from './pages/Buiness-page';
import Confirm from './pages/Confirm';
import UploadImages from './pages/UploadImages';
import FinalComponent from './components/Final';
import Home from './pages/Home';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path={`/${process.env.REACT_APP_ROUTER}`} element={<FormData />} />
          <Route path={`/${process.env.REACT_APP_ROUTER}/buiness`} element={<BuinessPage />} />
          <Route path={`/${process.env.REACT_APP_ROUTER}/confirm`} element={<Confirm />} />
          <Route path={`/${process.env.REACT_APP_ROUTER}/upload-image`} element={<UploadImages />} />
          <Route path={`/${process.env.REACT_APP_ROUTER}/final`} element={<FinalComponent />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;