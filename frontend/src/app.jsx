<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MainLandingPage from './Pages/MainLandingPage';
import react from 'react';
import NavBar from './components/Navbar';
import Searchbar from './components/SearchNav';
=======
import { Outlet } from 'react-router';
import Navbar from './components/Navbar';
>>>>>>> c029038a400828c1725de1db199fa42103f25f85

function App() {

  return (
<<<<<<< HEAD
    <Router>
      <NavBar/>
      <Searchbar/>
      <Routes>
        <Route path="/" element={<MainLandingPage/>} />
      </Routes>
    </Router>
=======
    <>
      <Navbar />
      <Outlet />
    </>
>>>>>>> c029038a400828c1725de1db199fa42103f25f85
  );
}

export default App;
